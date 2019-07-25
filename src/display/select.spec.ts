import "../mockBrowser";
// tslint:disable no-var-requires
const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { SelectText } from "../index";
import { FieldType, TProp } from "../interface/widget";

o.spec("SelectText", () => {

	o("text", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("val");
		m.mount(root, {
			view: () => m(SelectText, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.select,
					options: [{
						label: "Test Value",
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
		o((content.childNodes[1] as HTMLSpanElement).getAttribute("title")).equals("Test Value");
	});

	o("missing value fallback", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("missing");
		m.mount(root, {
			view: () => m(SelectText, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.select,
					// Value not present
					options: []
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
		const content = root.childNodes[0];
		o(content.childNodes.length).equals(2);
		// Check value fallback
		o((content.childNodes[1] as HTMLSpanElement).getAttribute("title")).equals("missing");
	});

});