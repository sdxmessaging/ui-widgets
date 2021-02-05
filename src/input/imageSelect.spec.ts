import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile } from "../interface/widget";
import { dataURItoBlob } from "../utils";

import { ImageSelect } from "./imageSelect";
import { addImages } from "./imageMulti";

describe("ImageSelect", () => {

	test("empty", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(ImageSelect, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.image
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
	});

	test("single + uiClass", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([{
			guid: "test",
			name: "Test",
			path: "/test/path"
		}]);
		m.mount(root, {
			view: () => m(ImageSelect, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.image,
					uiClass: {}
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
	});

	test("set 0", (done) => {
		const fileList = stream<IFile[]>([]);
		const add = addImages(fileList, 1024, true);
		// Set empty file list
		const emptyList = ([] as unknown) as FileList;
		add(emptyList)
			.then(() => {
				expect(fileList().length).toBe(0);
				done();
			});
	});

	test("set 1", (done) => {
		const fileList = stream<IFile[]>([]);
		const add = addImages(fileList, 1024, true);
		const file = new File([
			dataURItoBlob("data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")
		], "test.gif", { type: "image/gif" });
		// Set 1 file
		const addList = ([file] as unknown) as FileList;
		add(addList)
			.then(() => {
				expect(fileList().length).toBe(1);
				done();
			});
	});

});
