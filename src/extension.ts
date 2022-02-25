import { stringify } from 'querystring';
import * as vscode from 'vscode';
import { resourceLimits } from 'worker_threads';

let gitStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	console.log('innoVS-gitInfo is now active');

	const getInfoCommand = 'sample.showSelectionCount';
	context.subscriptions.push(vscode.commands.registerCommand(getInfoCommand, () => {
		vscode.window.showInformationMessage(getCurrentLine(), {modal: true});
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

function getCurrentLine(): string {
	let result: string;

	if (vscode.window.activeTextEditor) {
		const n = vscode.window.activeTextEditor.selection.active.line + 1;
		result = `Line: ${n}`;
	}
	else {
		result = `No line \n selected!`;
	}

	return result;
}

function updateStatusBarItem(): void {
	gitStatusBarItem.show();
}

// this method is called when your extension is deactivated
export function deactivate() {}
