const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { ToggleInput } from "./toggle";

o.spec("ToggleInput", () => {

	o("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<boolean>(false);
		m.mount(root, {
			view: () => m(ToggleInput, {
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
		const value = stream<boolean>(true);
		m.mount(root, {
			view: () => m(ToggleInput, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					uiClass: {},
					disabled: true,
					options: [{
						label: "test", value: true
					}]
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

});
