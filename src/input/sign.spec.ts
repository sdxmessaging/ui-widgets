import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile, SignTypes } from "../interface/widget";

import { SignBuilder } from "./sign";
import { setFile } from "./sign";

describe("SignBuilder", () => {

	test("empty", () => {
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
		expect(root.childNodes.length).toBe(1);
		// End stream depending on value change
		m.mount(root, null);
	});

	test("options + heightPct", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(SignBuilder, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.sign,
					uiClass: {},
					options: [{
						value: SignTypes.Draw
					}, {
						value: "unknown"
					}],
					heightPct: 50,
					stampTxt: "test",
					stampSetTxt: "test-signature"
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
	});

	test("default", () => {
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
		expect(root.childNodes.length).toBe(1);
	});

	test("disabled", () => {
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
		expect(root.childNodes.length).toBe(1);
	});

	test("readonly", () => {
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
		expect(root.childNodes.length).toBe(1);
	});

	test("set", () => {
		const fileList = stream<IFile[]>([]);
		const set = setFile(fileList, "test", 100);
		expect.assertions(1);
		set("data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")
			.then(() => {
				expect(fileList().length).toBe(1);
			});
	});

});
