import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile } from "../interface/widget";
import { dataURItoBlob } from "../utils";

import { addImages, ImageMulti } from "./imageMulti";

describe("ImageMulti", () => {

	test("empty", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(ImageMulti, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.imageMulti
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
		expect(root.childNodes[0].childNodes.length).toBe(2);
	});

	test("single + uiClass", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([{
			guid: "test",
			name: "Test",
			path: "/test/path"
		}]);
		m.mount(root, {
			view: () => m(ImageMulti, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.imageMulti,
					uiClass: {}
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
		expect(root.childNodes[0].childNodes.length).toBe(2);
	});

	test("add", (done: () => void) => {
		const fileList = stream<IFile[]>([]);
		const add = addImages(fileList, 1024);
		// Add 2 basic files
		const file = new File([
			dataURItoBlob("data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")
		], "test.gif", { type: "image/gif" });
		add(([file, file] as unknown) as FileList)
			.then(() => {
				expect(fileList().length).toBe(2);
				done();
			});
	});

});
