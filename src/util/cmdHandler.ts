import * as cp from 'child_process';

export const cmd = (
	command: string,
	options: cp.ExecOptions = {} 
): Promise<string> =>
	new Promise<string>((resolve, reject) => {
		cp.exec(command, {...options, encoding: "utf8"}, (err, out) => {
			if (err) {
				return reject(err);
			}
			return resolve(out);
		});
	}
	);