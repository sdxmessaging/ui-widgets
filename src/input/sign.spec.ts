const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile, SignTypes } from "../interface/widget";

import { SignBuilder } from "./sign";
import { setFile } from "./sign";

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

	o("options + heightPct", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(SignBuilder, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.sign,
					classes: "custom",
					options: [{
						value: SignTypes.Draw
					}, {
						value: "unknown"
					}],
					heightPct: 50
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

	o("default", () => {
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

	o("disabled", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(SignBuilder, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.sign,
					disabled: true
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

	o("readonly", () => {
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
					type: FieldType.sign,
					readonly: true
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

	o("set", (done: () => void) => {
		o.timeout(1000);
		const fileList = stream<IFile[]>([]);
		const set = setFile(fileList, "test", 100);
		set("data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")
			.then(() => {
				o(fileList().length).equals(1);
				done();
			});
	});

});
