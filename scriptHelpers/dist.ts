const shell = require('shelljs');
const currentVersion = require('../package.json').version;
const path = require('path');
const fs = require("fs");

const enum versionBump {
	MAJOR = "major",
	MINOR = "minor",
	PATCH = "patch"
}

const bumpType = process.argv.reduce<versionBump>((acc, arg) => {
	switch (arg.toLowerCase()) {
		case versionBump.MAJOR: return versionBump.MAJOR;
		case versionBump.MINOR: return versionBump.MINOR;
		default: return acc;
	}
}, versionBump.PATCH);

const bumpVersion = ((bumpType: versionBump) => {
	const [major, minor, patch] = currentVersion.split(".").map(Number);
	switch (bumpType) {
		case versionBump.MAJOR:
			return `${major + 1}.0.0`;
		case versionBump.MINOR:
			return `${major}.${minor + 1}.0`;
		default:
			return `${major}.${minor}.${patch + 1}`;
	}
})(bumpType);

interface IProcess {
	execute(version: string): { readonly code: number; };
	rollback(version: string): void;
	errMsg: string;
	executeMsg: string;
}

class ProcessStack {

	private version: string;
	private processArray: ReadonlyArray<IProcess>;

	constructor(processArray: ReadonlyArray<IProcess>, version: string) {
		this.version = version;
		this.processArray = processArray;
	}

	public async execute() {
		for (let i = 0; i < this.processArray.length; i++) {
			let process = this.processArray[i];
			console.log(process.executeMsg);
			try {
				let result = await process.execute(this.version);
				if (result && result.code !== 0) {
					console.warn(process.errMsg);
					return process.rollback(this.version);
				}
			}
			catch (err) {
				console.log(err);
				console.warn(process.errMsg);
				return process.rollback(this.version);
			}
			if (i === this.processArray.length - 1) {
				console.log('\x1b[32m', `Hoorah!! You published a new ui-widgets ${bumpType} version - ${this.version}`);
			}
		}
	}
}

const processArray: ReadonlyArray<IProcess> = [
	// Release notes
	{
		execute: (version: string) => {
			const releaseNotes = fs.readFileSync(path.join(__dirname, "../release-notes.md"));
			if (releaseNotes.includes(version)) return { code: 0 };
			console.error("\x1b[41m\x1b[30m", `Did you forget something‽ You need to add release-notes for version: ${version}...and no you can't do it later!`, "\x1b[40m\x1b[37m",);
			return { code: 1 };
		},
		rollback: () => null,
		errMsg: 'Publish failed, could not find release notes. See logs for more details',
		executeMsg: 'Checking for release notes...'
	},
	// Pull
	{
		execute: () => shell.exec("git pull -q"),
		rollback: () => null,
		errMsg: "Publish failed, could not pull changes ui-widgets. See logs for more details",
		executeMsg: "Pulling changes on ui-widgets..."
	},
	// Test
	{
		execute: () => shell.exec("npm run test"),
		rollback: () => null,
		errMsg: "Publish failed, could not run tests. See logs for more details",
		executeMsg: "Running tests..."
	},
	// Build, add and commit
	{
		execute: () => shell.exec(`npm run build && git add -A -- . && git commit -m "full build"`),
		rollback: () => shell.exec("git reset --hard HEAD~1"),
		errMsg: "Publish failed, could not commit ui-widgets. See logs for more details",
		executeMsg: "Building ui-widgets..."
	},
	// Version (+git tag)
	{
		execute: (version: string) => shell.exec(`npm version ${version}`),
		rollback: (version: string) => shell.exec(`git tag -d v${version} && git reset --hard HEAD~2`),
		errMsg: "Publish failed, could not version ui-widgets. See logs for more details",
		executeMsg: "Running npm version on ui-widgets..."
	},
	// Push follow tags
	{
		execute: () => shell.exec("git push --follow-tags --no-verify"),
		rollback: (version: string) => shell.exec(`git tag -d v${version} && git reset --hard HEAD~2`),
		errMsg: "Publish failed, See logs for more details",
		executeMsg: "Git push..."
	}
];

const processStack = new ProcessStack(processArray, bumpVersion);
processStack.execute();
