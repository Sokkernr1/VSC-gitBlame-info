import path = require('path');
import * as vscode from 'vscode';
import * as gitCommands from './util/gitCommands';
import * as urlParser from './util/parseURL';
import { Logger } from './util/logger';

let gitStatusBarItem: vscode.StatusBarItem;

export async function activate(context: vscode.ExtensionContext) {
	
	Logger.write('info', 'innoVS-gitInfo is now active');

	const getInfoCommand = 'gitBlameInfo.expandInfo';
	context.subscriptions.push(vscode.commands.registerCommand(getInfoCommand, async () => {
		await vscode.window.showInformationMessage(`Line: ${getCurrentLine()}`);
	}));
	
	gitStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	gitStatusBarItem.command = getInfoCommand;
	context.subscriptions.push(gitStatusBarItem);

	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(getGitInfo));
	context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(getGitInfo));

	gitStatusBarItem.show();

	await getGitInfo();
}

function getCurrentLine(): number {
	let result: number;

	if (vscode.window.activeTextEditor) {
		result = vscode.window.activeTextEditor.selection.active.line + 1;
	}
	else {
		return 0;
	}

	return result;
}

async function getGitInfo() {

	updateStatusBarItem('$(sync~spin)Loading...');
	if(vscode.window.activeTextEditor){
		let currentlyOpenTabfilePath = vscode.window.activeTextEditor.document.fileName;
		const currentlyOpenTabfileName = path.basename(currentlyOpenTabfilePath);

		currentlyOpenTabfilePath = currentlyOpenTabfilePath.replace(currentlyOpenTabfileName, '');

		if(await gitCommands.isGitRepo(currentlyOpenTabfilePath)) {
			if(await gitCommands.isFileTracked(currentlyOpenTabfilePath, currentlyOpenTabfileName)){
				const gitBlameInfo = await gitCommands.getBlame(currentlyOpenTabfilePath, currentlyOpenTabfileName, getCurrentLine());
				const gitBranchInfo = await gitCommands.getBranch(currentlyOpenTabfilePath);
				const gitURLInfo = await gitCommands.getURL(currentlyOpenTabfilePath);
				const commitURL = urlParser.getCommitLink(gitBlameInfo.hash, gitURLInfo);
			
				console.log(gitBlameInfo);
				console.log(gitBranchInfo);
				console.log(gitURLInfo);
				console.log(commitURL);
			}
			else {
				Logger.write('Warning', 'File is ignored by .gitignore');
				updateStatusBarItem('$(git-commit)File is ignored');
			}
		}
		else {
			Logger.write('Warning', 'File is not part of a git repository');
			updateStatusBarItem('$(git-commit)Git info');
		}
	} 
	else {
		Logger.write('Info', 'No file opened');
		updateStatusBarItem('$(git-commit)Git info');
	}
}

function updateStatusBarItem(text: string): void {
	gitStatusBarItem.text = text;
}
