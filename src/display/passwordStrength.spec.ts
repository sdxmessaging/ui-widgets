const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { TProp } from "../interface/widget";

import { PasswordStrength } from "./passwordStrength";
// TODO Test password scoring
// import { passwordStrengthStr } from "./passwordStrength";
// import { scorePassword } from "./passwordStrength";

o.spec("PasswordStrength", () => {

	o("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("");
		m.mount(root, {
			view: () => m(PasswordStrength, {
				field: {
					id: "test"
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
		const content = root.childNodes[0];
		o(content.childNodes.length).equals(2);
	});

	o("configured", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("input");
		m.mount(root, {
			view: () => m(PasswordStrength, {
				field: {
					id: "test",
					label: "Test Label"
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
		const content = root.childNodes[0];
		o(content.childNodes.length).equals(3);
	});

});
