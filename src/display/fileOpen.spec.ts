const o = require("ospec");

import m from "mithril";

import { FileOpen } from "./fileOpen";

o.spec("FileOpen", () => {

	o("click", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(FileOpen, {
				guid: "test",
				name: "file",
				path: "not_set"
			})
		});
		o(root.childNodes.length).equals(1);
		// Click element
		const openBtn = root.childNodes[0];
		openBtn.dispatchEvent(new Event("click"));
	});

	o("configured", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(FileOpen, {
				guid: "test",
				name: "file",
				path: "./"
			})
		});
		// Click element (error, navigation not supported)
		const openBtn = root.childNodes[0];
		openBtn.dispatchEvent(new Event("click"));
	});

});
