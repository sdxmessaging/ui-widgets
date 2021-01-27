const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { BaseText } from "./baseText";

o.spec("BaseText", () => {

	o("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("test");
		m.mount(root, {
			view: () => m(BaseText, {
				field: {
					id: "test",
				},
				value
			})
		});
		// Container element (Label + Input children)
		o(root.childNodes.length).equals(1);
	});

	o("configured", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("test");
		m.mount(root, {
			view: () => m(BaseText, {
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
