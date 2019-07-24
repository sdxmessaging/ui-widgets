import "../mockBrowser";
// tslint:disable no-var-requires
const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile } from "../interface/widget";

import { FileMulti } from "./fileMulti";

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

});
