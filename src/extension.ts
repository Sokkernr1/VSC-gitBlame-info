import * as vscode from 'vscode';
import { cmd } from './util/cmdHandler';
import { getBlameObject } from './util/streamParser';
import * as gitCommands from './util/gitCommands';

let gitStatusBarItem: vscode.StatusBarItem;

export async function activate(context: vscode.ExtensionContext) {
	
	console.log('innoVS-gitInfo is now active');


	await getGitInfo();

	const getInfoCommand = 'sample.showSelectionCount';
	context.subscriptions.push(vscode.commands.registerCommand(getInfoCommand, async () => {
		await vscode.window.showInformationMessage(`Line: ${getCurrentLine()}`);
	}));

	gitStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	gitStatusBarItem.command = getInfoCommand;
	gitStatusBarItem.text = 'hello';
	context.subscriptions.push(gitStatusBarItem);
	
	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

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

	const gitBlameInfo = await gitCommands.getBlame('/Volumes/privateWorkspace/innoGames/projects/innoVS-gitInfo/src', 'extension.ts', 10);
	const gitBranchInfo = await gitCommands.getBranch('/Volumes/privateWorkspace/innoGames/projects/innoVS-gitInfo/src');
	const gitURLInfo = await gitCommands.getURL('/Volumes/privateWorkspace/innoGames/projects/innoVS-gitInfo/src');

	console.log(gitBlameInfo);
	console.log(gitBranchInfo);
	console.log(gitURLInfo);
}

function updateStatusBarItem(): void {
	gitStatusBarItem.show();
}

// this method is called when your extension is deactivated
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}
