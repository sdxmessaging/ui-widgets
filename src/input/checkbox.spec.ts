// tslint:disable no-var-requires
const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, TProp } from "../interface/widget";

import { CheckboxInput } from "./checkbox";

o.spec("CheckboxInput", () => {

	o("value", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>(true);
		m.mount(root, {
			view: () => m(CheckboxInput, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.checkbox
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

	o("disabled", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>(true);
		m.mount(root, {
			view: () => m(CheckboxInput, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.checkbox,
					disabled: true
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

});
