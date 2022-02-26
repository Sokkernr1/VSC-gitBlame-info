import * as vscode from 'vscode';
import { cmd } from './util/cmdHandler';
import { getInfoObject } from './util/streamParser';

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

	let result = await cmd('git blame -L 10 extension.ts -l -t -p', {cwd: '/Volumes/privateWorkspace/innoGames/projects/innoVS-gitInfo/src'});

	let newObject = getInfoObject(result);

	console.log(newObject);
}

function updateStatusBarItem(): void {
	gitStatusBarItem.show();
}

// this method is called when your extension is deactivated
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}
