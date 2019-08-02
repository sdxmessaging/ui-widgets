// tslint:disable no-var-requires
const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile } from "../interface/widget";

import { ImagePreview } from "./imagePreview";

o.spec("ImagePreview", () => {

	o("empty", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(ImagePreview, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.image
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

	o("single", () => {
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
					label: "test",
					type: FieldType.image
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

});
