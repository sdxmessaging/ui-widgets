const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, TProp } from "../interface/widget";

import { Checkbox } from "./checkbox";

o.spec("Checkbox", () => {

	o("checked", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>(true);
		m.mount(root, {
			view: () => m(Checkbox, {
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

	o("unchecked", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>(false);
		m.mount(root, {
			view: () => m(Checkbox, {
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

});
