import m from "mithril";
import stream from "mithril/stream";

import { IFile } from "../interface/widget";

import { ImageList } from "./image";

describe("ImageList", () => {

	test("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(ImageList, {
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
			path: "/test/path",
		}, {
			guid: "data",
			name: "Data",
			path: "/",
			dataUrl: "data:image/gif;base64,==="
		}]);
		m.mount(root, {
			view: () => m(ImageList, {
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
