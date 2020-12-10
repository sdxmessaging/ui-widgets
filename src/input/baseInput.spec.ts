const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, TProp } from "../interface/widget";

import { BaseInput } from "./baseInput";

o.spec("BaseInput", () => {

	o("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("test");
		m.mount(root, {
			view: () => m(BaseInput, {
				field: {
					id: "test"
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
		// Input only
		o(root.childNodes[0].childNodes.length).equals(1);
	});

	o("configured", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("test");
		const xform = value.map((val) => val);
		m.mount(root, {
			view: () => m(BaseInput, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					type: FieldType.number,
					classes: "test",
					disabled: true,
					instant: true
				},
				value,
				xform
			})
		});
		o(root.childNodes.length).equals(1);
		// Label + Input
		o(root.childNodes[0].childNodes.length).equals(2);
	});

});
