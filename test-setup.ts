const nodeCrypto = require("crypto");

Object.defineProperty(global.Image.prototype, "src", {
	set(_) {
		if (this.onload) {
			this.onload();
		}
	}
});

Object.defineProperties(global.self, {
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
