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

	let result = await execShell('pwd', {cwd: '/Volumes/workspace'});

	console.log(result);

	// let execution: ChildProcess;

	// let command = "git";
	// let args = ["ls-remote", "--get-url"];
	// let options: ExecOptions = {};

    // try {
    //     execution = execFile(command, args, { ...options, encoding: "utf8" });
	// 	console.log(execution);
    // } catch (err) {
    //     console.log(err);
	// 	return;
    // }

	// let data = '';

	// for await (const chunk of execution?.stdout ?? []) {
    //     data += chunk;
	// 	console.log('hello');
    // }

	// console.log(data);
}

const execShell = (
	cmd: string,
	options: cp.ExecOptions = {} ) =>
    new Promise<string>((resolve, reject) => {
        cp.exec(cmd, {...options, encoding: "utf8"}, (err, out) => {
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
