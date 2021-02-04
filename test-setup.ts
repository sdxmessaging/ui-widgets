// tslint:disable no-var-requires
const canvas = require("canvas");
const jsdom = require("jsdom");
const nodeCrypto = require('crypto');



/// Stub basic crypto
Object.defineProperty(global.self, "crypto", {
	value: {
		getRandomValues: (buffer: any) => nodeCrypto.randomFillSync(buffer)
	}
});




// Stub window open (not supported)
Object.defineProperty(global.self, "open", {
	value: () => null
});
// // Copy props from window onto global (Blob, File, atob etc)
Object.defineProperties(global, {
	//...Object.getOwnPropertyDescriptors(dom.window),
	...Object.getOwnPropertyDescriptors(canvas),
	...Object.getOwnPropertyDescriptors(global)
});

// Initial Mithril load
//require("mithril");

// Cleanup
afterAll(() => global.self.close());
