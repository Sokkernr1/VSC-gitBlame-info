import path = require('path');
import * as vscode from 'vscode';
import * as gitCommands from './util/gitCommands';
import * as urlParser from './util/parseURL';
import { Logger } from './util/logger';

let gitStatusBarItem: vscode.StatusBarItem;
let hash: string;
let author: string;
let committer: string;
let mail: string;
let timestamp: string;
let tz: string;
let date: Date;
let summary: string;
let timeAgo: string;

const infoMessage = <T extends vscode.MessageItem>(
	message: string,
	item: undefined | T[] = [],
): Promise<T | undefined> => {
	return Promise.resolve(vscode.window.showInformationMessage(message, ...item));
};

type ActionItem = vscode.MessageItem & {
    action: () => void;
}

export async function activate(context: vscode.ExtensionContext) {
	
	Logger.write('info', 'innoVS-gitInfo is now active');

	const actionItem: ActionItem[] = [{
		title: "Open info",
		async action() {
			console.log('fired action');
			await handleClickEvent();
		}
	}];

	const getInfoCommand = 'gitBlameInfo.expandInfo';
	context.subscriptions.push(vscode.commands.registerCommand(getInfoCommand, async () => {
		(await infoMessage(`Summary: ${summary}`, actionItem))?.action();
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

async function handleClickEvent(): Promise<void> {
	if(vscode.window.activeTextEditor){
		let currentlyOpenTabfilePath = vscode.window.activeTextEditor.document.fileName;
		const currentlyOpenTabfileName = path.basename(currentlyOpenTabfilePath);
		currentlyOpenTabfilePath = currentlyOpenTabfilePath.replace(currentlyOpenTabfileName, '');

		if(await gitCommands.isGitRepo(currentlyOpenTabfilePath) && await gitCommands.isFileTracked(currentlyOpenTabfilePath, currentlyOpenTabfileName)){
			const branchURL = await gitCommands.getURL(currentlyOpenTabfilePath);
	
			await vscode.env.openExternal(vscode.Uri.parse(urlParser.getCommitLink(hash, branchURL)));
		}

	}
}

async function getGitInfo(): Promise<void> {

	updateStatusBarItem('$(sync~spin)Loading...');
	if(vscode.window.activeTextEditor){
		let currentlyOpenTabfilePath = vscode.window.activeTextEditor.document.fileName;
		const currentlyOpenTabfileName = path.basename(currentlyOpenTabfilePath);

		currentlyOpenTabfilePath = currentlyOpenTabfilePath.replace(currentlyOpenTabfileName, '');

		if(await gitCommands.isGitRepo(currentlyOpenTabfilePath)) {
			if(await gitCommands.isFileTracked(currentlyOpenTabfilePath, currentlyOpenTabfileName)){
				const gitBlameInfo = await gitCommands.getBlame(currentlyOpenTabfilePath, currentlyOpenTabfileName, getCurrentLine());

				//Ugly but makes configuring for users easier
				hash = gitBlameInfo.hash;
				author = gitBlameInfo.author;
				committer = gitBlameInfo.committer;
				mail = gitBlameInfo.mail;
				timestamp = gitBlameInfo.timestamp;
				tz = gitBlameInfo.tz;
				date = gitBlameInfo.date;
				summary = gitBlameInfo.summary;
				timeAgo = gitBlameInfo.timeAgo;

				updateStatusBarItem(`$(git-commit)From: ${committer} (${timeAgo})`);
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
