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
		o(root.childNodes.length).equals(1);
		o(root.childNodes[0].childNodes.length).equals(1);
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
					uiClass: {},
					disabled: true,
					instant: true
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
		o(root.childNodes[0].childNodes.length).equals(2);
	});

	o("toggle", () => {
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
		const input = root.querySelector("input") as HTMLInputElement;
		o(input != null).equals(true);
		o(input.getAttribute("type")).equals("password");
		// Click toggle
		const toggleBtn = root.querySelector("i") as HTMLElement;
		o(toggleBtn != null).equals(true);
		toggleBtn.dispatchEvent(new Event("click"));
		m.redraw.sync();
		// Confirm input is no longer password
		o(input.getAttribute("type")).equals("text");
	});

});
