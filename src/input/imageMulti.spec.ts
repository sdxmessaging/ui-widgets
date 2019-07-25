import "../mockBrowser";
// tslint:disable no-var-requires
const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile } from "../interface/widget";

import { ImageMulti } from "./imageMulti";
// import { addFiles } from "./imageMulti";

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
	});

	o("single", () => {
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
					type: FieldType.imageMulti
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

	// o("add", () => {
	// 	const fileList = stream<IFile[]>([]);
	// 	const add = addFiles(fileList, 1024);
	// 	const file = { name: "Test", type: "image/jpeg" };
	// 	const addList = ([file, file] as unknown) as FileList;
	// 	add(addList);
	// 	o(fileList().length).equals(2);
	// });

});
