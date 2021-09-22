import m from "mithril";
import stream from "mithril/stream";

import { DateInput } from "./dateInput";

describe("DateInput", () => {

	test("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<string>();
		m.mount(root, {
			view: () => m(DateInput, {
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
			view: () => m(DateInput, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					uiClass: {},
					disabled: true,
					options: [{ value: "en-US" }]
				},
				value,
				xform
			})
		});
		expect(root.childNodes.length).toBe(1);
		// Label + Input
		expect(root.childNodes[0].childNodes.length).toBe(2);
		// Set valid date
		value("2020-01-01");
		// Set invalid date
		value("2020-01-32");
		// Get day input and update value
		const dateIn = root.querySelector("#test-dd") as HTMLInputElement;
		expect(dateIn != null).toBe(true);
		dateIn.value = "02";
		dateIn.dispatchEvent(new Event("input"));
		expect(value()).toBe("2020-01-02");
		// Set invalid value
		dateIn.value = "32";
		dateIn.dispatchEvent(new Event("input"));
		expect(value()).toBe("2020-01-02");
		// Cleanup
		m.mount(root, null);
	});

});
