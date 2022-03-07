import { getBlameObject, gitBlameTemplate, gitBlameBlank } from './streamParser';
import { cmd } from './cmdHandler';
import { Logger } from './logger';

export async function getBlame(path: string, fileName: string, line: number): Promise<gitBlameTemplate> {
	Logger.write('Command', `git blame -L ${line},${line} ${fileName} --incremental`);
	const cmdResult = await cmd(`git blame -L ${line},${line} ${fileName} --incremental`, {cwd: path});
	return cmdResult !== 'Null' ? getBlameObject(cmdResult) : gitBlameBlank();
}

export async function getBranch(path: string): Promise<string>{
	Logger.write('Command', 'git symbolic-ref -q HEAD --short');
	const result = await cmd('git symbolic-ref -q HEAD --short', {cwd: path});
	return result.replace(/\s/gi, '');
}

export async function getURL(path: string): Promise<string>{
	Logger.write('Command', `git ls-remote --get-url`);
	const result = await cmd('git ls-remote --get-url', {cwd: path});
	return result.replace(/\s/gi, '');
}

export async function isGitRepo(path: string): Promise<boolean>{
	Logger.write('Command', `git -C . rev-parse 2>/dev/null; echo $?`);
	const result = await cmd('git -C . rev-parse 2>/dev/null; echo $?', {cwd: path});
	return Number(result) === 0;
}

export async function isFileTracked(path: string, fileName: string): Promise<boolean>{
	Logger.write('Command', `git check-ignore ${fileName} &>/dev/null; echo $?`);
	const result = await cmd(`git check-ignore ${fileName} &>/dev/null; echo $?`, {cwd: path});
	return Number(result) === 1;
}