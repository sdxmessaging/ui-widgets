const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { TProp } from "../interface/widget";

import { RadioInput } from "./radio";

o.spec("RadioInput", () => {

	o("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("");
		m.mount(root, {
			view: () => m(RadioInput, {
				field: {
					id: "test"
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
		o(root.childNodes[0].childNodes.length).equals(1);
	});

	o("configured", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("val");
		m.mount(root, {
			view: () => m(RadioInput, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					uiClass: {},
					options: [{
						value: "val"
					}, {
						value: "val2",
						label: "val2",
						icon: "test"
					}]
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
		o(root.childNodes[0].childNodes.length).equals(2);
	});

});
