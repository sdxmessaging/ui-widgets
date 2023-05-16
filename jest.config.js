/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	transform: {
		"\.ts$": ["ts-jest", { tsconfig: "tsconfig.test.json" }]
	},
	setupFiles: ["./test-setup.ts", "jest-canvas-mock"]
};
