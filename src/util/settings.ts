import { workspace } from "vscode";

export type PropertiesMap = {
    "statusBarMessageDisplayLeft": boolean;
	"statusBarMessageFormat": string;
    "statusBarPositionPriority": number | undefined;
    "infoMessageFormat": string;
    "statusBarMessageNoRepo": string;
	"statusBarMessageIgnoredFile": string;
	"statusBarMessageNoCommit": string;
	"statusBarMessageNoInfoFound": string;
	"statusBarMessageLoading": string;
	"statusBarMessageNoFileOpened": string;
}

// getConfiguration has an unfortunate typing that does not
// take any possible default values into consideration.
export const getProperty = <Key extends keyof PropertiesMap>(
	name: Key,
): PropertiesMap[Key] => workspace.getConfiguration("gitBlameInfo").get(name) as PropertiesMap[Key];
