const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, TProp } from "../interface/widget";

import { PasswordInput } from "./password";

o.spec("PasswordInput", () => {

	o("basic + instant", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("test");
		m.mount(root, {
			view: () => m(PasswordInput, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.text,
					instant: true
				},
				value
			})
		});
		// Label + Input
		o(root.childNodes.length).equals(2);
	});

	o("name + no label + title", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("test");
		m.mount(root, {
			view: () => m(PasswordInput, {
				field: {
					id: "test",
					label: "",
					name: "test",
					title: "test title",
					type: FieldType.text
				},
				value
			})
		});
		// Label + Input
		o(root.childNodes.length).equals(2);
	});

	o("required + classes", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("test");
		m.mount(root, {
			view: () => m(PasswordInput, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.text,
					classes: "test",
					required: true
				},
				value
			})
		});
		o(root.childNodes.length).equals(2);
	});

});
