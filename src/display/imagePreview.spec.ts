const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { IFile } from "../interface/widget";

import { ImagePreview } from "./imagePreview";

o.spec("ImagePreview", () => {

	o("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(ImagePreview, {
				field: {
					id: "test"
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

	o("configured", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([{
			guid: "test",
			name: "Test",
			path: "/test/path"
		}]);
		m.mount(root, {
			view: () => m(ImagePreview, {
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
		o(root.childNodes.length).equals(1);
	});

});
