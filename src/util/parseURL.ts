export function getCommitLink(hash: string, repoURL: string): string{
	let urlString = repoURL.replace(/.*(?=@)./i, "https://");
	urlString = urlString.replace(/(?<=git.+):/i, "/");
	urlString = urlString.replace(/(?<=innogames.de|innogames.com)\//i, "/projects/");
	urlString = urlString.replace(/(?<=bitbucket.+)\/((?!.+\/))/i, "/repos/");
	urlString = urlString.replace(/\.git/i, "");

	if(urlString.includes('bitbucket')){
		urlString = urlString + '/commits/';
	}
	else {
		urlString = urlString + '/commit/';
	}

	urlString = urlString + hash;

	return urlString;
}