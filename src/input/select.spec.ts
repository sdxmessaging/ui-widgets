const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, TProp } from "../interface/widget";

import { SelectInput } from "./select";

o.spec("SelectInput", () => {

	o("basic", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("val");
		m.mount(root, {
			view: () => m(SelectInput, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.radio,
					options: [{
						label: "Test Value",
						value: "val"
					}]
				},
				value
			})
		});
		o(root.childNodes.length).equals(2);
	});

	o("name + classes", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("val");
		m.mount(root, {
			view: () => m(SelectInput, {
				field: {
					id: "test",
					label: "test",
					name: "test name",
					title: "test title",
					type: FieldType.radio,
					classes: "test",
					options: [{
						label: "Test Value",
						value: "val"
					}]
				},
				value
			})
		});
		o(root.childNodes.length).equals(2);
	});

	o("missing value fallback", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("missing");
		m.mount(root, {
			view: () => m(SelectInput, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.radio,
					// Value not present
					options: []
				},
				value
			})
		});
		o(root.childNodes.length).equals(2);
	});

});
