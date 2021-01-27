const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { PasswordStrength } from "./passwordStrength";
import { scorePassword } from "./passwordStrength";
import { passwordStrengthStr } from "./passwordStrength";

o.spec("PasswordStrength", () => {

	o("component", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("");
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
		// Cleanup
		m.mount(root, null);
	});

	o("scorePassword", () => {
		o(scorePassword("short")).equals(0);
		o(scorePassword("eightchar")).equals(1);
		o(scorePassword("12345678")).equals(2);
		o(scorePassword("twentyfourcharacterslong")).equals(2);
		o(scorePassword("UpperUpper")).equals(2);
		o(scorePassword("special$")).equals(2);
	});

	o("passwordStrengthStr", () => {
		[0, 1, 2, 3, 4, 5].map((val) => {
			o(passwordStrengthStr(val)).notEquals("");
		});
		o(passwordStrengthStr(-1)).equals("");
	});

});
