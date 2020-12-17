const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile } from "../interface/widget";
import { dataURItoBlob } from "../utils";

import { addImages, ImageMulti } from "./imageMulti";

o.spec("ImageMulti", () => {

	o("empty", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(ImageMulti, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.imageMulti
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
		o(root.childNodes[0].childNodes.length).equals(1);
	});

	o("single + classes", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([{
			guid: "test",
			name: "Test",
			path: "/test/path"
		}]);
		m.mount(root, {
			view: () => m(ImageMulti, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.imageMulti,
					classes: "test"
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
		o(root.childNodes[0].childNodes.length).equals(1);
	});

	o("add", (done: () => void) => {
		const fileList = stream<IFile[]>([]);
		const add = addImages(fileList, 1024);
		// Add 2 basic files
		const file = new File([
			dataURItoBlob("data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")
		], "test.gif", { type: "image/gif" });
		add(([file, file] as unknown) as FileList)
			.then(() => {
				o(fileList().length).equals(2);
				done();
			});
	});

});
