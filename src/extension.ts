import { stringify } from 'querystring';
import * as vscode from 'vscode';
import { resourceLimits } from 'worker_threads';
import * as cp from 'child_process';

let gitStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	
	console.log('innoVS-gitInfo is now active');


	getGitInfo();

	const getInfoCommand = 'sample.showSelectionCount';
	context.subscriptions.push(vscode.commands.registerCommand(getInfoCommand, () => {
		vscode.window.showInformationMessage(`Line: ${getCurrentLine()}`);
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

async function getGitInfo(): Promise<void> {

	let result = await execShell('git blame -L 10 extension.ts -l -t -p', {cwd: '/Volumes/privateWorkspace/innoGames/projects/innoVS-gitInfo/src'});

	let resultData = result.split('\n');
	for (var i = 0; i < resultData.length; i++) {
		if (/author/i.test(resultData[i])) {
			let text = resultData[i].replace(/author /i, 'From: ');
			console.log(text);
		  break;
		}
	}
}

const execShell = (
	command: string,
	options: cp.ExecOptions = {} ) =>
    new Promise<string>((resolve, reject) => {
        cp.exec(command, {...options, encoding: "utf8"}, (err, out) => {
            if (err) {
                return reject(err);
            }
            return resolve(out);
        });
    });

function updateStatusBarItem(): void {
	gitStatusBarItem.show();
}

// this method is called when your extension is deactivated
export function deactivate() {}
