import m from "mithril";

import { FileOpen } from "./fileOpen";

describe("FileOpen", () => {

	test("click", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(FileOpen, {
				guid: "test",
				name: "file",
				path: "not_set"
			})
		});
		expect(root.childNodes.length).toBe(1);
		// Click element
		const openBtn = root.childNodes[0];
		openBtn.dispatchEvent(new Event("click"));
	});

	test("configured", () => {
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
