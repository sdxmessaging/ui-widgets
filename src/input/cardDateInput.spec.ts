import m from "mithril";
import stream from "mithril/stream";

import { CardDateInput } from "./cardDateInput";

describe("CardDateInput", () => {

	test("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<string>();
		m.mount(root, {
			view: () => m(CardDateInput, {
				field: {
					id: "test"
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
		// Input only
		expect(root.childNodes[0].childNodes.length).toBe(1);
		// Cleanup
		m.mount(root, null);
	});

	test("configured + value change", () => {
		const root = window.document.createElement("div");
		const value = stream<string>();
		const xform = value.map((val) => val);
		m.mount(root, {
			view: () => m(CardDateInput, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					uiClass: {},
					disabled: true
				},
				value,
				xform
			})
		});
		expect(root.childNodes.length).toBe(1);
		// Label + Input
		expect(root.childNodes[0].childNodes.length).toBe(2);
		// Set empty date
		value("");
		// Set partial date
		value("01");
		// Set valid date
		value("01/20");
		// Get month input and update value
		const dateIn = root.querySelector("#test-mm") as HTMLInputElement;
		expect(dateIn != null).toBe(true);
		dateIn.value = "02";
		dateIn.dispatchEvent(new Event("change"));
		// Verify change
		expect(value()).toBe("02/20");
		// Cleanup
		m.mount(root, null);
	});

});
