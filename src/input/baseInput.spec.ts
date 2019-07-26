import "../mockBrowser";
// tslint:disable no-var-requires
const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, TProp } from "../interface/widget";

import { BaseInput } from "./baseInput";

o.spec("BaseInput", () => {

	o("text", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("test");
		m.mount(root, {
			view: () => m(BaseInput, {
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

	o("name + disabled + classes", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("test");
		m.mount(root, {
			view: () => m(BaseInput, {
				field: {
					id: "test",
					name: "custom",
					label: "test",
					type: FieldType.text,
					disabled: true,
					classes: "ma2"
				},
				value
			})
		});
		o(root.childNodes.length).equals(2);
	});

	o("required + instant", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("test");
		m.mount(root, {
			view: () => m(BaseInput, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.text,
					required: true,
					instant: true
				},
				value
			})
		});
		o(root.childNodes.length).equals(2);
	});

});
