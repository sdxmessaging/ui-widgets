import "../mockBrowser";
// tslint:disable no-var-requires
const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile } from "../interface/widget";

import { FileMulti } from "./fileMulti";
import { addFiles, removeFile } from "./fileMulti";

o.spec("FileMulti", () => {

	o("empty", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(FileMulti, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.fileMulti
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
			view: () => m(FileMulti, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.fileMulti
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

	o("add", () => {
		const fileList = stream<IFile[]>([]);
		const add = addFiles(fileList);
		const file = { name: "Test" };
		const addList = ([file, file] as unknown) as FileList;
		add(addList);
		o(fileList().length).equals(2);
	});

	o("remove", () => {
		const fileList = stream<IFile[]>([{
			guid: "1",
			name: "Test 1",
			path: "not_set"
		}, {
			guid: "2",
			name: "Test 2",
			path: "not_set"
		}]);
		// Attempt to remove file not present
		const removeNone = removeFile(fileList, "n/a");
		removeNone();
		o(fileList().length).equals(2);
		// Remove first file
		const remove1 = removeFile(fileList, "1");
		remove1();
		o(fileList().length).equals(1);
		o(fileList()[0].guid).equals("2");
	});

});
