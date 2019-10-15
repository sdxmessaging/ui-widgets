// tslint:disable no-var-requires
const o = require("ospec");
const canvas = require("canvas");
const jsdom = require("jsdom");
const nodeCrypto = require("crypto");

const dom = new jsdom.JSDOM("", {
	// Enable requestAnimationFrame
	pretendToBeVisual: true,
});

// Stub basic crypto
Object.defineProperty(dom.window, "crypto", {
	value: {
		getRandomValues: (buffer: any) => nodeCrypto.randomFillSync(buffer)
	}
});
// Copy props from window onto global (Blob, File, atob etc)
Object.defineProperties(global, {
	...Object.getOwnPropertyDescriptors(dom.window),
	...Object.getOwnPropertyDescriptors(canvas),
	...Object.getOwnPropertyDescriptors(global)
});

// Initial Mithril load
require("mithril");

// Cleanup
o.after(() => dom.window.close());
