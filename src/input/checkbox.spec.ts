const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { TProp } from "../interface/widget";

import { CheckboxInput } from "./checkbox";

o.spec("CheckboxInput", () => {

	o("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>(false);
		m.mount(root, {
			view: () => m(CheckboxInput, {
				field: {
					id: "test"
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

	o("configured", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>(true);
		m.mount(root, {
			view: () => m(CheckboxInput, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					uiClass: {},
					disabled: true
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

});
