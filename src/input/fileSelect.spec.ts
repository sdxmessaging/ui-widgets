const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile } from "../interface/widget";

import { FileSelect } from "./fileSelect";
import { setFile } from "./fileSelect";

o.spec("FileSelect", () => {

	o("empty", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(FileSelect, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.file
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
			view: () => m(FileSelect, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.file
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

	o("set", () => {
		const fileList = stream<IFile[]>([]);
		const add = setFile(fileList);
		const file = { name: "Test" };
		// Set empty file list
		const emptyList = ([] as unknown) as FileList;
		add(emptyList);
		o(fileList().length).equals(0);
		// Set 1 file
		const addList = ([file, file] as unknown) as FileList;
		add(addList);
		o(fileList().length).equals(1);
	});

});
