module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.test.json',
		},
	},
	setupFiles: ['./test-setup.ts'],
	testPathIgnorePatterns : [
		".js" 
	  ]
};
