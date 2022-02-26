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

	return infoObject;
}

function extractHash(infoString: string) : string {

	for (let i = 0; i < infoString.length; i++) {
		if (/author/i.test(infoString[i])) {
			let text = infoString[i].replace(/author /i, 'From: ');
			console.log(text);
			break;
		}
	}
	return '';
}