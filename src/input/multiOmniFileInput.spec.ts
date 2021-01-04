const o = require("ospec");
import lodash from "lodash";
import m from "mithril";
import stream from "mithril/stream";

import { DisplayType, FieldType, IFile } from "../interface/widget";

import { MultiOmniFileInput } from "./multiOmniFileInput";

const imageData = "data:image/gif;base64,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";

const blob = new Blob([imageData]);
const blobToFile = (theBlob: Blob, fileName: string): File => {
	var b: any = theBlob;
	b.lastModifiedDate = new Date();
	b.name = fileName;
	return <File>theBlob;
};

const testImage = blobToFile(blob, "file_name");
const testFile = blobToFile(blob, "testFile");

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
