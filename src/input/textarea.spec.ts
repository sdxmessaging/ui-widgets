const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { TProp } from "../interface/widget";

import { TextareaInput } from "./textarea";

o.spec("TextareaInput", () => {

	o("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("test");
		m.mount(root, {
			view: () => m(TextareaInput, {
				field: {
					id: "test"
				},
				value
			})
		});
		// Label + Input
		o(root.childNodes.length).equals(1);
	});

	o("configured", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("test");
		m.mount(root, {
			view: () => m(TextareaInput, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					classes: "test",
					required: true,
					instant: true
				},
				value
			})
		});
		o(root.childNodes.length).equals(2);
	});

});
