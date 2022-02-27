import { between } from "./ago";

export type gitInfoTemplate = {
	hash: string,
	author: string,
	committer: string,
	mail: string,
	timestamp: string,
	tz: string,
	date: Date,
	summary: string,
	timeAgo: string
}

const gitInfoBlank = (): gitInfoTemplate => ({
	hash: '',
	author: '',
	committer: '',
	mail: '',
	timestamp: '',
	tz: '',
	date: new Date,
	summary: '',
	timeAgo: ''
});

export function getInfoObject( infoString: string) : object {
	const data = infoString.split('\n');
	const infoObject = extractInfo(data);

	return infoObject;
}

function extractInfo(infoString: string[]): gitInfoTemplate {
	const dataObject = gitInfoBlank();

	dataObject.hash = infoString[0].replace(/.(?<=\s).*/i, '');
	dataObject.author = infoString[1].replace(/author./i, '');
	dataObject.committer = infoString[5].replace(/committer./i, '');
	dataObject.mail = infoString[6].replace(/committer-mail./i, '');
	dataObject.timestamp = infoString[7].replace(/committer-time./i, '');
	dataObject.tz = infoString[8].replace(/committer-tz./i, '');
	dataObject.summary = infoString[9].replace(/summary./i, '');
	dataObject.date = new Date(Number(dataObject.timestamp) * 1000);
	dataObject.timeAgo = between(new Date(Date.now()), new Date(Number(dataObject.timestamp) * 1000));
	
	return dataObject;
}
