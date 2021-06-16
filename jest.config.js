/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	testEnvironmentOptions: {
		resources: "usable"
	},
	// testEnvironmentOptions: { resources: 1 },
	globals: {
		"ts-jest": {
			tsconfig: "tsconfig.test.json",
		},
	},
	setupFiles: ["./test-setup.ts", "jest-canvas-mock"]
};
