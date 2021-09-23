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
		const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
		const yearIn = root.querySelector("#test-yy") as HTMLInputElement;

		expect(monthIn != null).toBe(true);
		expect(yearIn != null).toBe(true);

		monthIn.value = "02";
		monthIn.dispatchEvent(new Event("input"));
		// Verify change
		expect(value()).toBe("02/20");

		yearIn.value = "99";
		yearIn.dispatchEvent(new Event("input"));
		expect(value()).toBe("02/99");

		monthIn.value = "13";
		yearIn.value = "00";
		monthIn.dispatchEvent(new Event("input"));
		yearIn.dispatchEvent(new Event("input"));
		expect(value()).toBe("02/00");

		monthIn.value = "00";
		monthIn.dispatchEvent(new Event("input"));
		expect(value()).toBe("02/00");

		monthIn.value = "1";
		yearIn.value = "0";
		monthIn.dispatchEvent(new Event("input"));
		yearIn.dispatchEvent(new Event("input"));
		expect(value()).toBe("");
		// Cleanup
		m.mount(root, null);
	});

});

test("auto advance", () => {
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
	const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
	const yearIn = root.querySelector("#test-yy") as HTMLInputElement;
	const yearInSpy = jest.spyOn(yearIn, 'focus');

	monthIn.value = "02";
	monthIn.dispatchEvent(new Event("input"));
	expect(yearInSpy).toBeCalledTimes(1);
});
