const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile } from "../interface/widget";

import { FileSelect } from "./fileSelect";
import { addFiles } from "./fileMulti";

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
					type: FieldType.file,
					uiClass: {}
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

	o("set", () => {
		const fileList = stream<IFile[]>([]);
		const add = addFiles(fileList, true);
		const file = { name: "Test" };
		const addList = ([file] as unknown) as FileList;
		add(addList);
		o(fileList().length).equals(1);
	});

});
