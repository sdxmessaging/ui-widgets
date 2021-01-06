const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile } from "../interface/widget";
import { dataURItoBlob } from "../utils";

import { ImageSelect } from "./imageSelect";
import { addImages } from "./imageMulti";

o.spec("ImageSelect", () => {

	o("empty", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(ImageSelect, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.image
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

	o("single + uiClass", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([{
			guid: "test",
			name: "Test",
			path: "/test/path"
		}]);
		m.mount(root, {
			view: () => m(ImageSelect, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.image,
					uiClass: {}
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

	o("set 0", (done: () => void) => {
		const fileList = stream<IFile[]>([]);
		const add = addImages(fileList, 1024, true);
		// Set empty file list
		const emptyList = ([] as unknown) as FileList;
		add(emptyList)
			.then(() => {
				o(fileList().length).equals(0);
				done();
			});
	});

	o("set 1", (done: () => void) => {
		const fileList = stream<IFile[]>([]);
		const add = addImages(fileList, 1024, true);
		const file = new File([
			dataURItoBlob("data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")
		], "test.gif", { type: "image/gif" });
		// Set 1 file
		const addList = ([file] as unknown) as FileList;
		add(addList)
			.then(() => {
				o(fileList().length).equals(1);
				done();
			});
	});

});
