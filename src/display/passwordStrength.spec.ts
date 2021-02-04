import m from "mithril";
import stream from "mithril/stream";

import { PasswordStrength } from "./passwordStrength";
import { scorePassword } from "./passwordStrength";
import { passwordStrengthStr } from "./passwordStrength";

describe("PasswordStrength", () => {

	test("component", () => {
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
		expect(root.childNodes.length).toBe(1);
		const content = root.childNodes[0];
		expect(content.childNodes.length).toBe(2);
		// Cleanup
		m.mount(root, null);
	});

	test("scorePassword", () => {
		expect(scorePassword("short")).toBe(0);
		expect(scorePassword("eightchar")).toBe(1);
		expect(scorePassword("12345678")).toBe(2);
		expect(scorePassword("twentyfourcharacterslong")).toBe(2);
		expect(scorePassword("UpperUpper")).toBe(2);
		expect(scorePassword("special$")).toBe(2);
	});

	test("passwordStrengthStr", () => {
		[0, 1, 2, 3, 4, 5].map((val) => {
			expect(passwordStrengthStr(val)).not.toBe("");
		});
		expect(passwordStrengthStr(-1)).toBe("");
	});

});
