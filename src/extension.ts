import path = require('path');
import * as vscode from 'vscode';
import * as gitCommands from './util/gitCommands';
import * as urlParser from './util/parseURL';

let gitStatusBarItem: vscode.StatusBarItem;

export async function activate(context: vscode.ExtensionContext) {
	
	console.log('innoVS-gitInfo is now active');

	await getGitInfo();

	const getInfoCommand = 'gitBlameInfo.giveLineInfo';
	context.subscriptions.push(vscode.commands.registerCommand(getInfoCommand, async () => {
		await vscode.window.showInformationMessage(`Line: ${getCurrentLine()}`);
	}));

	gitStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	gitStatusBarItem.command = getInfoCommand;
	gitStatusBarItem.text = '$(git-commit)$(sync~spin)hello';
	context.subscriptions.push(gitStatusBarItem);
	
	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(getGitInfo));
	context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(getGitInfo));

	gitStatusBarItem.show();

	if (vscode.window.activeTextEditor) {
		vscode.window.activeTextEditor.selection.active.line;
	}
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

	if(vscode.window.activeTextEditor){
		let currentlyOpenTabfilePath = vscode.window.activeTextEditor.document.fileName;
		const currentlyOpenTabfileName = path.basename(currentlyOpenTabfilePath);

		currentlyOpenTabfilePath = currentlyOpenTabfilePath.replace(currentlyOpenTabfileName, '');

		if(await gitCommands.isGitRepo(currentlyOpenTabfilePath)) {
			if(await gitCommands.isFileTracked(currentlyOpenTabfilePath, currentlyOpenTabfileName)){
				const gitBlameInfo = await gitCommands.getBlame(currentlyOpenTabfilePath, currentlyOpenTabfileName, 10);
				const gitBranchInfo = await gitCommands.getBranch(currentlyOpenTabfilePath);
				const gitURLInfo = await gitCommands.getURL(currentlyOpenTabfilePath);
				const commitURL = urlParser.getCommitLink(gitBlameInfo.hash, gitURLInfo);
			
				console.log(gitBlameInfo);
				console.log(gitBranchInfo);
				console.log(gitURLInfo);
				console.log(commitURL);
			}
			else {
				console.log('File is ignored');
			}
		}
		else {
			console.log('No git repo');
		}
	} 
	else {
		console.log('No file opened');
	}
}

function updateStatusBarItem(): void {
	gitStatusBarItem.show();
}
