const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, TProp } from "../interface/widget";

import { TextareaInput } from "./textarea";

o.spec("TextareaInput", () => {

	o("basic + name + instant + classes", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("test");
		m.mount(root, {
			view: () => m(TextareaInput, {
				field: {
					id: "test",
					label: "test",
					name: "test name",
					type: FieldType.text,
					classes: "test",
					instant: true
				},
				value
			})
		});
		// Label + Input
		o(root.childNodes.length).equals(2);
	});

	o("required + no label + title", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("test");
		m.mount(root, {
			view: () => m(TextareaInput, {
				field: {
					id: "test",
					label: "",
					title: "test",
					type: FieldType.text,
					required: true
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

});
