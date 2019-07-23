import "../mockBrowser";
// tslint:disable no-var-requires
const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { TextareaInput } from "../index";
import { FieldType, TProp } from "../interface/widget";

o.spec("TextareaInput", () => {

	o("text", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("test");
		m.mount(root, {
			view: () => m(TextareaInput, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.text
				},
				value
			})
		});
		// Label + Input
		o(root.childNodes.length).equals(2);
	});

	o("required", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("test");
		m.mount(root, {
			view: () => m(TextareaInput, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.text,
					required: true
				},
				value
			})
		});
		o(root.childNodes.length).equals(2);
	});

});
