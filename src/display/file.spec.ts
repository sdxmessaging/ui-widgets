import m from "mithril";
import stream from "mithril/stream";

import { IFile } from "../interface/widget";

import { FileList } from "./file";

describe("FileList", () => {

	test("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(FileList, {
				field: {
					id: "test"
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
	});

	test("configured", () => {
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
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					uiClass: {}
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
	});

});
