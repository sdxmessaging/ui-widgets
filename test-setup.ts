// tslint:disable no-var-requires
const o = require("ospec");
const canvas = require("canvas");
const jsdom = require("jsdom");

const dom = new jsdom.JSDOM("", {
	// Enable requestAnimationFrame
	pretendToBeVisual: true,
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
