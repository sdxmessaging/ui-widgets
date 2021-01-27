const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { Label } from "./label";

o.spec("Label", () => {

	o("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<boolean>(true);
		m.mount(root, {
			view: () => m(Label, {
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
			view: () => m(Label, {
				field: {
					id: "test",
					label: "Test Label",
					title: "Test Title",
					required: true
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

});
