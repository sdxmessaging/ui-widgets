const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { TProp } from "../interface/widget";

import { PasswordInput } from "./password";

o.spec("PasswordInput", () => {

	o("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("test");
		m.mount(root, {
			view: () => m(PasswordInput, {
				field: {
					id: "test"
				},
				value
			})
		});
		o(root.childNodes.length).equals(2);
	});

	o("configured", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("test");
		m.mount(root, {
			view: () => m(PasswordInput, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					classes: "test",
					disabled: true,
					instant: true
				},
				value
			})
		});
		o(root.childNodes.length).equals(2);
	});

});
