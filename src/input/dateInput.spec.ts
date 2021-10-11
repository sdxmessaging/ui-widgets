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
		// expect(root.childNodes[0].childNodes.length).toBe(2);
		// Set valid date
		value("2020-01-01");
		// Set invalid date
		value("2020-01-32");
		// Get day input and update value
		const dayIn = root.querySelector("#test-dd") as HTMLInputElement;
		const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
		const yearIn = root.querySelector("#test-yyyy") as HTMLInputElement;

		expect(dayIn != null).toBe(true);
		expect(monthIn).not.toBeNull();

		dayIn.value = "aa";
		monthIn.value = "aa";
		yearIn.value = "1899";
		dayIn.dispatchEvent(new Event("input"));
		monthIn.dispatchEvent(new Event("input"));
		yearIn.dispatchEvent(new Event("input"));

		expect(value()).toBe("2020-01-01");
		// Set invalid value
		dayIn.value = "00";
		monthIn.value = "00";
		yearIn.value = "1900";

		dayIn.dispatchEvent(new Event("input"));
		monthIn.dispatchEvent(new Event("input"));
		yearIn.dispatchEvent(new Event("input"));

		expect(value()).toBe("1900-01-01");

		dayIn.value = "31";
		monthIn.value = "12";
		yearIn.value = "2020";

		dayIn.dispatchEvent(new Event("input"));
		monthIn.dispatchEvent(new Event("input"));
		yearIn.dispatchEvent(new Event("input"));

		expect(value()).toBe("2020-12-31");

		dayIn.value = "31";
		monthIn.value = "12";
		yearIn.value = "3000";

		dayIn.dispatchEvent(new Event("input"));
		monthIn.dispatchEvent(new Event("input"));
		yearIn.dispatchEvent(new Event("input"));
		expect(value()).toBe("2020-12-31");

		dayIn.value = "";
		monthIn.value = "12";
		yearIn.value = "3000";

		dayIn.dispatchEvent(new Event("input"));
		monthIn.dispatchEvent(new Event("input"));
		yearIn.dispatchEvent(new Event("input"));
		expect(value()).toBe("");

		dayIn.value = "31";
		monthIn.value = "12";
		yearIn.value = "3000";

		dayIn.dispatchEvent(new Event("input"));
		monthIn.dispatchEvent(new Event("input"));
		yearIn.dispatchEvent(new Event("input"));
		expect(value()).toBe("2020-12-31");

		dayIn.value = "-1";
		monthIn.value = "-1";
		yearIn.value = "3000";

		dayIn.dispatchEvent(new Event("input"));
		monthIn.dispatchEvent(new Event("input"));
		yearIn.dispatchEvent(new Event("input"));
		expect(value()).toBe("2020-12-31");
		// Cleanup
		m.mount(root, null);
	});

});


test("configured + value change - GB locale", () => {
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
				options: [{ value: "en-GB" }]
			},
			value,
			xform
		})
	});
	expect(root.childNodes.length).toBe(1);
	// Label + Input
	// expect(root.childNodes[0].childNodes.length).toBe(2);
	value("2020-01-01");
	// Get date inputs and update value
	const dayIn = root.querySelector("#test-dd") as HTMLInputElement;
	const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
	const yearIn = root.querySelector("#test-yyyy") as HTMLInputElement;
	dayIn.value = "31";
	monthIn.value = "12";
	yearIn.value = "3000";

	dayIn.dispatchEvent(new Event("input"));
	monthIn.dispatchEvent(new Event("input"));
	yearIn.dispatchEvent(new Event("input"));
	expect(value()).toBe("2020-12-31");
});

test("auto advance - locale GB", () => {
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
				options: [{ value: "en-GB" }]
			},
			value,
			xform
		})
	});
	const dayIn = root.querySelector("#test-dd") as HTMLInputElement;
	const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
	const yearIn = root.querySelector("#test-yyyy") as HTMLInputElement;
	const monthInSpy = jest.spyOn(monthIn, 'focus');
	const yearInSpy = jest.spyOn(yearIn, 'focus');

	dayIn.value = "0";
	dayIn.dispatchEvent(new Event("input"));
	expect(monthInSpy).toBeCalledTimes(0);
	expect(yearInSpy).toBeCalledTimes(0);

	dayIn.value = "01";
	dayIn.dispatchEvent(new Event("input"));
	expect(monthInSpy).toBeCalledTimes(1);
	expect(yearInSpy).toBeCalledTimes(0);

	monthIn.value = "02";
	monthIn.dispatchEvent(new Event("input"));
	expect(yearInSpy).toBeCalledTimes(1);

});

test("auto advance - locale US", () => {
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
	const dayIn = root.querySelector("#test-dd") as HTMLInputElement;
	const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
	const yearIn = root.querySelector("#test-yyyy") as HTMLInputElement;
	const yearInSpy = jest.spyOn(yearIn, 'focus');
	const dayInSpy = jest.spyOn(dayIn, 'focus');

	monthIn.value = "02";
	monthIn.dispatchEvent(new Event("input"));
	expect(dayInSpy).toBeCalledTimes(1);

	dayIn.value = "01";
	dayIn.dispatchEvent(new Event("input"));
	expect(yearInSpy).toBeCalledTimes(1);

});
