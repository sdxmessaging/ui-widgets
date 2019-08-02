// tslint:disable no-var-requires
const o = require("ospec");
const canvas = require("canvas");
const fileApi = require("file-api");
const jsdom = require("jsdom");

const dom = new jsdom.JSDOM("", {
	// Enable requestAnimationFrame
	pretendToBeVisual: true,
});

// Add globals for Mithril and ui-widgets
Object.assign(global, {
	window: dom.window,
	document: dom.window.document,
	requestAnimationFrame: dom.window.requestAnimationFrame,
	Image: canvas.Image,
	// Browser file helpers
	atob: (data: string) => Buffer.from(data, "base64").toString(),
	Blob: require("node-blob"),
	// file-api module does not have modern File constructor
	File: fileApi.File,
	FileList: fileApi.FileList,
	FileReader: fileApi.FileReader
});

// Initial Mithril load
require("mithril");

// Cleanup
o.after(() => {
	dom.window.close();
});
