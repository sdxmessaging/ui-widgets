import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile } from "../interface/widget";

import { FileSelect } from "./fileSelect";
import { addFiles } from "./fileMulti";

describe("FileSelect", () => {

	test("empty", () => {
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
		expect(root.childNodes.length).toBe(1);
	});

	test("single", () => {
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
		expect(root.childNodes.length).toBe(1);
	});

	test("set", () => {

		//global.crypto.getRandomValues = (buffer: any) => crypto.randomFillSync(buffer);
		const fileList = stream<IFile[]>([]);
		const add = addFiles(fileList, true);
		const file = { name: "Test" };
		const addList = ([file] as unknown) as FileList;
		add(addList);
		expect(fileList().length).toBe(1);
	});

});
