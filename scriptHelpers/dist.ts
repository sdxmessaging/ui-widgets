
const shell = require('shelljs');
const currentVersion = require('../package.json').version;

enum versionBump {
	MAJOR = 'major',
	MINOR = 'minor',
	PATCH = 'patch'
}

const bumpType = process.argv.reduce(
	(acc, arg): versionBump =>
		arg.includes('BUMP') ? arg.split('=')[1] as versionBump : acc as versionBump,
	versionBump.PATCH
) as versionBump || versionBump.PATCH;

const bumpVersion = ((bumpType?: versionBump) => {
	const [major, minor, patch] = currentVersion.split('.').map((str: string) => Number(str));

	switch (bumpType) {
		case versionBump.MAJOR:
			return `${major + 1}.${minor}.${patch}`
		case versionBump.MINOR:
			return `${major}.${minor + 1}.${patch}`
		default:
			return `${major}.${minor}.${patch + 1}`
	}

})(bumpType)

interface IProcess {
	execute: (version: string) => { code: number },
	rollback: (version: string) => void,
	errMsg: string,
	executeMsg: string
}

class ProcessStack {

	private version: string;
	private processArray: IProcess[];

	constructor(processArray: IProcess[], version: string) {
		this.version = version;
		this.processArray = processArray;
	}

	execute = async () => {
		for (let i = 0; i < this.processArray.length; i++) {
			let process = this.processArray[i];
			console.log(process.executeMsg);
			let result = await process.execute(this.version);
			if (result.code !== 0) {
				console.warn(process.errMsg);
				return process.rollback(this.version);
			}
			if (i === this.processArray.length - 1) {
				console.log('\x1b[32m', `Hoorah! You published a new ${bumpVersion} version - `, this.version);
			}
		}
	}
}


const processArray: IProcess[] = [
	{
		execute: () => shell.exec(`git pull -q`),
		rollback: () => null,
		errMsg: 'Publish failed, could not pull changes ui-widgets. See logs for more details',
		executeMsg: 'Pulling changes on ui-widgets...'
	},
	{
		execute: (version) => shell.exec(`npm run build && git add -A -- . && git commit -m 'build-file-for-version-${version}' -n -q`),
		rollback: () => null,
		errMsg: 'Publish failed, could not version ui-widgets. See logs for more details',
		executeMsg: 'Building ui-widgets...'
	},
	{
		execute: (version) => shell.exec(`npm version ${version}`),
		rollback: () => null,
		errMsg: 'Publish failed, could not version ui-widgets. See logs for more details',
		executeMsg: 'Running npm version on ui-widgets...'
	},
	{
		execute: () => shell.exec(`git push --follow-tags`),
		rollback: (version) => {
			shell.exec(`git tag -d v${version}`);
		},
		errMsg: 'Publish failed. See logs for more details',
		executeMsg: 'Git push on ui-widgets...'
	},
];

const processStack = new ProcessStack(processArray, bumpVersion);
processStack.execute();
