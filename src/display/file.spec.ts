const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile } from "../interface/widget";

import { FileList } from "./file";

o.spec("FileList", () => {

	o("empty", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(FileList, {
				field: {
					id: "test",
					label: "test",
					// file or fileMulti are handled in the same manner
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
			view: () => m(FileList, {
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

});
