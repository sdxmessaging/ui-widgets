const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile } from "../interface/widget";

import { ImageList } from "./image";

o.spec("ImageList", () => {

	o("empty", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(ImageList, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.imageMulti
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

	o("multiple", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([{
			guid: "test",
			name: "Test",
			path: "/test/path"
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
					label: "test",
					type: FieldType.imageMulti
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

});
