import m from "mithril";
import stream from "mithril/stream";

import { PasswordInput } from "./password";

describe("PasswordInput", () => {

	test("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("test");
		m.mount(root, {
			view: () => m(PasswordInput, {
				field: {
					id: "test"
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
		expect(root.childNodes[0].childNodes.length).toBe(1);
	});

	test("configured", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("test");
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
		expect(root.childNodes.length).toBe(1);
		const input = root.getElementsByTagName('input');
		expect(input[0].id).toBe('test');
	});

	test("toggle", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("test");
		m.mount(root, {
			view: () => m(PasswordInput, {
				field: {
					id: "test"
				},
				value
			})
		});
		const input = root.querySelector("input") as HTMLInputElement;
		expect(input != null).toBe(true);
		expect(input.getAttribute("type")).toBe("password");
		// Click toggle
		const toggleBtn = root.querySelector("[title='Show Password']") as HTMLElement;
		expect(toggleBtn != null).toBe(true);
		toggleBtn.dispatchEvent(new Event("click"));
		m.redraw.sync();
		// Confirm input is no longer password
		expect(input.getAttribute("type")).toBe("text");
	});

});
