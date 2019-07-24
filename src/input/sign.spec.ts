import "../mockBrowser";
// tslint:disable no-var-requires
const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile } from "../interface/widget";

import { SignBuilder } from "../index";

o.spec("SignBuilder", () => {

	o("empty", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(SignBuilder, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.sign
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
			view: () => m(SignBuilder, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.sign
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

});
