const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { TProp } from "../interface/widget";

import { SelectText } from "./select";

o.spec("SelectText", () => {

	o("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("val");
		m.mount(root, {
			view: () => m(SelectText, {
				field: {
					id: "test"
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
		const content = root.childNodes[0];
		o(content.childNodes.length).equals(1);
		// Check value fallback
		o((content.childNodes[0] as HTMLSpanElement).getAttribute("title")).equals("val");
	});

	o("configured", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("val");
		m.mount(root, {
			view: () => m(SelectText, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					classes: "test",
					options: [{
						label: "label",
						value: "val"
					}]
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
		const content = root.childNodes[0];
		o(content.childNodes.length).equals(2);
		// Check value is resolved
		o((content.childNodes[1] as HTMLSpanElement).getAttribute("title")).equals("label");
	});

});
