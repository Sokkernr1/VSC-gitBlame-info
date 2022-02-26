export function getInfoObject( infoString: string) : object {
	let infoObject = {
		hash: String,
		author: String,
		committer: String,
		mail: String,
		timestamp: String,
		date: Date,
		summary: String
	};

	let data = infoString.split('\n');

	extractHash(data);

	return infoObject;
}

function extractHash(infoString: string[]) : string {
	console.log(infoString[0]);

	for (let i = 0; i < infoString.length; i++) {
		if (/author/i.test(infoString[i])) {
			let text = infoString[i].replace(/author /i, 'From: ');
			console.log(text);
			break;
		}
	}
	return '';
}