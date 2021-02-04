import lodash from "lodash";
import m from "mithril";
import stream from "mithril/stream";

import { DisplayType, FieldType, IFile } from "../interface/widget";
import { dataURItoBlob } from "../utils";

import { MultiOmniFileInput } from "./multiOmniFileInput";

const testImage = new File([
	dataURItoBlob("data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")
], "test.gif", { type: "image/gif" });
const testFile = new File([
	dataURItoBlob("data:text/plain;base64,Cg==")
], "test.txt", { type: "text/plain" });

describe("MultiOmniFileInput", () => {

	// Renders the file input 
	test("renders input with empty stream", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(MultiOmniFileInput, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.file,
				},
				showDisplay: false,
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
	});

	test("configured ", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(MultiOmniFileInput, {
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

	test("renders single file detail", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([{
			guid: "test",
			name: "Test",
			path: "not_set",
			file: testImage
		}]);
		m.mount(root, {
			view: () => m(MultiOmniFileInput, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.file
				},
				displayType: DisplayType.list,
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
	});

	test("renders image thumbnails with src string.", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([{
			guid: "test0",
			name: "Test0",
			path: "test0/image"
		}, {
			guid: "test1",
			name: "Test1",
			path: "test1/image"
		}]);
		m.mount(root, {
			view: () => m(MultiOmniFileInput, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.file,
				},
				// Use default displayType value
				value
			})
		});
		const imageElements = root?.firstElementChild?.firstElementChild?.children[1]?.children;
		lodash.forEach(imageElements, (element, index) => {
			const image = element.firstElementChild;
			const button = element.children[1].firstElementChild;
			expect(image).not.toBe(null);
			expect(image).not.toBe(undefined);
			expect(button).not.toBe(null);
			expect(button).not.toBe(undefined);
			if (image) {
				expect(image.getAttribute("src")).toBe("test" + index + "/image");
			}
		});
	});

	test("renders div with class of fa of some sort to render an icon rather than an image", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([{
			file: testFile,
			guid: "test0",
			name: "Test0",
			path: "not_set"
		}, {
			file: testFile,
			guid: "test1",
			name: "Test1",
			path: "not_set"
		}]);
		m.mount(root, {
			view: () => m(MultiOmniFileInput, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.file,
				},
				displayType: DisplayType.thumbnail,
				value
			})
		});
		const imageElements = root?.firstElementChild?.firstElementChild?.children[1]?.children;
		lodash.forEach(imageElements, (element) => {
			const div = element.firstElementChild;
			const button = element.children[1].firstElementChild;
			expect(div).not.toBe(null);
			expect(div).not.toBe(undefined);
			expect(button).not.toBe(null);
			expect(button).not.toBe(undefined);
			if (div) {
				expect(div.hasAttribute("tooltip")).toBe(true);
			}
		});
	});

});
