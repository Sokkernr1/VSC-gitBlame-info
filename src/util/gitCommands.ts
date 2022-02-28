import { getBlameObject, gitBlameTemplate } from './streamParser';
import { cmd } from './cmdHandler';

export async function getBlame(path: string, fileName: string, line: number): Promise<gitBlameTemplate> {
	const cmdResult = await cmd(`git blame -L ${line},${line} ${fileName} --incremental`, {cwd: path});
	return getBlameObject(cmdResult);

}

export async function getBranch(path: string): Promise<string>{
	const result = await cmd('git symbolic-ref -q HEAD --short', {cwd: path});
	return result.replace(/\s/gi, '');
}

export async function getURL(path: string): Promise<string>{
	const result = await cmd('git ls-remote --get-url', {cwd: path});
	return result.replace(/\s/gi, '');
}