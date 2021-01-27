const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { Checkbox } from "./checkbox";

o.spec("Checkbox", () => {

	o("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<boolean>(false);
		m.mount(root, {
			view: () => m(Checkbox, {
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
			view: () => m(Checkbox, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					uiClass: {}
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

});
