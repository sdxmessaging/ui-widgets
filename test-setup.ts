const canvas = require("canvas");
const nodeCrypto = require("crypto");

Object.defineProperties(global.self, {
	// Add canvas support
	...Object.getOwnPropertyDescriptors(canvas),
	// Add basic crypto
	crypto: {
		value: {
			getRandomValues: (buffer: any) => nodeCrypto.randomFillSync(buffer)
		}
	},
	// Stub window open
	open: {
		value: () => null
	}
});
