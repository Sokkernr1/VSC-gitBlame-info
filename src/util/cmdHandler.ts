import * as cp from 'child_process';
import { Logger } from './logger';

export const cmd = (
	command: string,
	options: cp.ExecOptions = {} 
): Promise<string> =>
	new Promise<string>((resolve) => {
		cp.exec(command, {...options, encoding: "utf8"}, (err, out) => {
			if (err) {
				Logger.write('Error', String(err));
				return resolve('Null');
			}
			Logger.write('Result', out);
			return resolve(out);
		});
	});