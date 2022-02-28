import { between } from "./ago";

export type gitBlameTemplate = {
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

const gitBlameBlank = (): gitBlameTemplate => ({
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

export function getBlameObject( infoString: string) : gitBlameTemplate {
	const data = infoString.split('\n');

	const infoObject = extractBlameInfo(data);

	return infoObject;
}

function extractBlameInfo(infoString: string[]): gitBlameTemplate {
	const dataObject = gitBlameBlank();

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
