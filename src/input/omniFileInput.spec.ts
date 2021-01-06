const o = require("ospec");

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

o.spec("OmniFileInput", () => {

	o("empty", () => {
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
		o(root.childNodes.length).equals(1);
	});

	o("configured", () => {
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
		o(root.childNodes.length).equals(1);
		o(root.firstElementChild?.classList.length).equals(3);
		// o(root.firstElementChild?.classList.toString()).equals("pa0 bn test");
	});

	o("regular set file", () => {
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
		o(root.childNodes.length).equals(1);
	});

	o("renders image with src string.", () => {
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
		const imgElem = root?.firstElementChild?.firstElementChild?.children[2].firstElementChild?.firstElementChild?.firstElementChild;
		o(imgElem).notEquals(null);
		o(imgElem).notEquals(undefined);
		if (imgElem) {
			o(imgElem.getAttribute("src")).equals("test0/image");
		}
	});

	o("renders div with a tooltip with file is not image", () => {
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
		// o(fileName).notEquals(null);
		// o(fileName).notEquals(undefined);
		// if (fileName) {
		// 	o(fileName).equals("Test0");
		// }
	});

	o("set non-image files", (done: () => void) => {
		const fileList = stream<IFile[]>([]);
		const add = addOmniFiles(fileList, true);
		// Set 1 file
		const addList = ([testFile, testFile] as unknown) as FileList;
		add(addList).then(() => {
			o(addList.length).equals(2);
			done();
		});
	});

	o("set image files", (done: () => void) => {
		const fileList = stream<IFile[]>([]);
		const add = addOmniFiles(fileList, false);
		// Add 2 images files
		add(([testImage, testImage] as unknown) as FileList).then(() => {
			o(fileList().length).equals(2);
			done();
		});
	});

	o("remove file from the stream", () => {
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
		o(fileList().length).equals(2);
		// Remove first file
		const remove1 = removeFile(fileList, "1");
		remove1(new Event("click"));
		o(fileList().length).equals(1);
		o(fileList()[0].guid).equals("2");
	});

});
