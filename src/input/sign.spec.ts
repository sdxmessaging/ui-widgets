// tslint:disable no-var-requires
const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile } from "../interface/widget";

import { SignBuilder } from "./sign";
import { SignState } from "./sign";
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

	o("set", (done: () => void) => {
		o.timeout(1000);
		const fileList = stream<IFile[]>([]);
		const state: stream<SignState> = stream<SignState>(SignState.Draw);
		const set = setFile(fileList, state, "test", 100);
		set("data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")
			.then(() => {
				o(state()).equals(SignState.Select);
				o(fileList().length).equals(1);
				done();
			});
	});

});
