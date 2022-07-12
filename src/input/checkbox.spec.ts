import m from "mithril";
import stream from "mithril/stream";

import { CheckboxInput } from "./checkbox";

describe("CheckboxInput", () => {

	test("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<boolean>(false);
		m.mount(root, {
			view: () => m(CheckboxInput, {
				field: {
					id: "test"
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
		// Issue key press to toggle checkbox (label click does not appear to work)
		const checkLabel = root.querySelector("label") as HTMLLabelElement;
		expect(checkLabel).not.toBeNull();
		checkLabel.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
		expect(value()).toBe(true);
		// Redraw and verify checkbox input
		m.redraw.sync();
		const checkBox = root.querySelector("input") as HTMLInputElement;
		expect(checkBox).not.toBeNull();
		expect(checkBox.checked).toBe(true);
	});

	test("configured", () => {
		const root = window.document.createElement("div");
		const value = stream<boolean>(true);
		m.mount(root, {
			view: () => m(CheckboxInput, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					uiClass: {},
					disabled: true
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
	});

});
