import m from "mithril";
import stream from "mithril/stream";

import { DisplayType, FieldType, IFile } from "../interface/widget";

import { dataURItoBlob } from "../utils";
import { removeFile } from "./fileMulti";

import { addOmniFiles, OmniFileInput } from "./omniFileInput";

const testImage = new File([
	dataURItoBlob("data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")
], "test.gif", { type: "image/gif" });
const testFile = new File([
	dataURItoBlob("data:text/plain;base64,Cg==")
], "test.txt", { type: "text/plain" });

describe("OmniFileInput", () => {

	test("empty", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(OmniFileInput, {
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

	test("configured", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(OmniFileInput, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.file,
					uiClass: { wrapper: "test" },
				},
				showDisplay: false,
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
		expect(root.firstElementChild?.classList.length).toBe(3);
		// expect(root.firstElementChild?.classList.toString()).toBe("pa0 bn test");
	});

	test("regular set file", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([{
			guid: "test",
			name: "Test",
			path: "/test/path"
		}]);
		m.mount(root, {
			view: () => m(OmniFileInput, {
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

	test("renders image with src string.", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([{
			guid: "test0",
			name: "Test0",
			path: "test0/image",
			dataUrl: "test0/image",
			file: testImage
		}]);
		m.mount(root, {
			view: () => m(OmniFileInput, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.file,
				},
				value
			})
		});
		const imgElem = root.querySelector("img[title=Test0]");
		expect(imgElem).toBeDefined();
	});

	test("renders div with a tooltip with file is not image", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([{
			file: testFile,
			guid: "test0",
			name: "Test0",
			path: "not_set",
		}]);
		m.mount(root, {
			view: () => m(OmniFileInput, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.file,
				},
				displayType: DisplayType.thumbnail,
				value
			})
		});
		// const fileName = root?.firstElementChild?.firstElementChild?.firstElementChild?.children[2]?.firstElementChild?.children[1]?.innerHTML;
		// expect(fileName).not.toBe(null);
		// expect(fileName).not.toBe(undefined);
		// if (fileName) {
		// 	expect(fileName).toBe("Test0");
		// }
	});

	test("set non-image files", (done) => {
		const fileList = stream<IFile[]>([]);
		const add = addOmniFiles(fileList, true);
		// Set 1 file
		const addList = ([testFile, testFile] as unknown) as FileList;
		add(addList).then(() => {
			expect(addList.length).toBe(2);
			done();
		});
	});

	test("set image files", (done) => {
		const fileList = stream<IFile[]>([]);
		const add = addOmniFiles(fileList, false);
		// Add 2 images files
		add(([testImage, testImage] as unknown) as FileList).then(() => {
			expect(fileList().length).toBe(2);
			done();
		});
	});

	test("remove file from the stream", () => {
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
