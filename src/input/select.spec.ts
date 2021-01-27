const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { SelectInput } from "./select";

o.spec("SelectInput", () => {

	o("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("");
		m.mount(root, {
			view: () => m(SelectInput, {
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
		const value = stream<string>("val");
		m.mount(root, {
			view: () => m(SelectInput, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					uiClass: {},
					disabled: true,
					options: [{
						value: "val"
					}]
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
		o(root.childNodes[0].childNodes.length).equals(2);
	});

	o("readonly", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("");
		m.mount(root, {
			view: () => m(SelectInput, {
				field: {
					id: "test",
					readonly: true,
					options: [{
						value: "val",
						label: "Value"
					}]
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
		o(root.childNodes[0].childNodes.length).equals(1);
	});

});
