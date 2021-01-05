const o = require("ospec");
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

o.spec("MultiOmniFileInput", () => {

	// Renders the file input 
	o("renders input with empty stream", () => {
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
		o(root.childNodes.length).equals(1);
	});

	o("configured ", () => {
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
		o(root.childNodes.length).equals(1);
		o(root.firstElementChild?.classList.length).equals(3);
		// o(root.firstElementChild?.classList.toString()).equals("pa0 bn test");
	});

	o("renders single image thumbnail.", () => {
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
				value
			})
		});
		m.redraw.sync();
		o(root.childNodes.length).equals(1);
	});

	o("renders image thumbnails with src string.", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([{
			guid: "test0",
			name: "Test0",
			path: "test0/image",
		},
		{
			guid: "test1",
			name: "Test1",
			path: "test1/image",
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
		m.redraw.sync();
		lodash.forEach(imageElements, (element, index) => {
			const image = element.firstElementChild;
			const button = element.children[1].firstElementChild;
			o(image).notEquals(null);
			o(image).notEquals(undefined);
			o(button).notEquals(null);
			o(button).notEquals(undefined);
			if (image) {
				o(image.getAttribute("src")).equals("test" + index + "/image");
			}

		});
	});

	o("renders div with class of fa of some sort to render an icon rather than an image", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([{
			file: testFile,
			guid: "test0",
			name: "Test0",
			path: "not_set",
		},
		{
			file: testFile,
			guid: "test1",
			name: "Test1",
			path: "not_set",
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
		m.redraw.sync();
		lodash.forEach(imageElements, (element) => {
			const div = element.firstElementChild;
			const button = element.children[1].firstElementChild;
			o(div).notEquals(null);
			o(div).notEquals(undefined);
			o(button).notEquals(null);
			o(button).notEquals(undefined);
			if (div) {
				o(div.hasAttribute("tooltip")).equals(true);
			}
		});
	});

});
