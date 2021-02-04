
import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile } from "../interface/widget";

import { FileMulti } from "./fileMulti";
import { addFiles, removeFile } from "./fileMulti";

describe("FileMulti", () => {

	test("empty", () => {
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
		expect(root.childNodes.length).toBe(1);
		expect(root.childNodes[0].childNodes.length).toBe(2);
	});

	test("single", () => {
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
					type: FieldType.fileMulti,
					uiClass: {}
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
		expect(root.childNodes[0].childNodes.length).toBe(2);
	});

	test("add", () => {
		const fileList = stream<IFile[]>([]);
		const add = addFiles(fileList);
		const file = { name: "Test" };
		const addList = ([file, file] as unknown) as FileList;
		add(addList);
		expect(fileList().length).toBe(2);
	});

	test("remove", () => {
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
		removeNone(new Event("click"));
		expect(fileList().length).toBe(2);
		// Remove first file
		const remove1 = removeFile(fileList, "1");
		remove1(new Event("click"));
		expect(fileList().length).toBe(1);
		expect(fileList()[0].guid).toBe("2");
	});

});
