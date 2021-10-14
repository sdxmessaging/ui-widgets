import m from "mithril";
import stream from "mithril/stream";
import { DateInput } from "./dateInput";

describe("DateInput", () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

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
		m.redraw.sync();
		expect(dayIn.style.textAlign).toEqual("center");
		expect(monthIn.style.textAlign).toEqual("center");
		expect(yearIn.style.textAlign).toEqual("center");

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
			view: () => [
				m(DateInput, {
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
				}),
				m(DateInput, {
					field: {
						id: "test2",
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
			]
		});
		const dayIn = root.querySelector("#test-dd") as HTMLInputElement;
		const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
		const yearIn = root.querySelector("#test-yyyy") as HTMLInputElement;
		const monthInSpy = jest.spyOn(monthIn, 'focus');
		const yearInSpy = jest.spyOn(yearIn, 'focus');
		const dayInSpy = jest.spyOn(dayIn, "focus");

		const dayIn2 = root.querySelector("#test2-dd") as HTMLInputElement;
		const monthIn2 = root.querySelector("#test2-mm") as HTMLInputElement;
		const yearIn2 = root.querySelector("#test2-yyyy") as HTMLInputElement;


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

		yearIn.value = "2020";
		yearIn.dispatchEvent(new Event("input"));
		// none of these should be called
		expect(yearInSpy).toBeCalledTimes(1);
		expect(monthInSpy).toBeCalledTimes(1);
		expect(dayInSpy).toBeCalledTimes(0);


		// Test two-way date binding
		m.redraw.sync();
		expect(yearIn2.value).toEqual("2020");
		expect(dayIn2.value).toEqual("01");
		expect(monthIn2.value).toEqual('02');

		// Test reset date value for other inputs sharing the same value stream
		yearIn2.value = '';
		yearIn2.dispatchEvent(new Event("input"));

		m.redraw.sync();
		expect(yearIn.value).not.toBeTruthy();
		expect(monthIn.value).not.toBeTruthy();
		expect(dayIn.value).not.toBeTruthy();

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


	test("auto retreat", () => {
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

		value("2020-01-01");

		const dayIn = root.querySelector("#test-dd") as HTMLInputElement;
		const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
		const yearIn = root.querySelector("#test-yyyy") as HTMLInputElement;
		const monthInSpy = jest.spyOn(monthIn, 'focus');
		const dayInSpy = jest.spyOn(dayIn, 'focus');
		const yearInSpy = jest.spyOn(yearIn, 'focus');


		yearIn.dispatchEvent(new InputEvent("input", { inputType: "deleteContentForward" }));
		expect(value()).not.toBeTruthy();
		expect(monthInSpy).toBeCalledTimes(0);

		yearIn.dispatchEvent(new KeyboardEvent("keydown", { key: "Backspace" }));

		expect(monthInSpy).toBeCalledTimes(1);

		monthIn.dispatchEvent(new KeyboardEvent("keydown", { key: "test" }));

		expect(dayInSpy).toBeCalledTimes(0);

		monthIn.dispatchEvent(new InputEvent("input", { inputType: "deleteContentBackward" }));
		expect(dayInSpy).toBeCalledTimes(0);

		monthIn.dispatchEvent(new KeyboardEvent("keydown", { key: "Delete" }));
		expect(dayInSpy).toBeCalledTimes(1);

		dayIn.dispatchEvent(new InputEvent("input", { inputType: "deleteContentForward" }));
		expect(dayInSpy).toBeCalledTimes(1);
		expect(yearInSpy).toBeCalledTimes(0);
		expect(monthInSpy).toBeCalledTimes(1);

		value('2021-02-20');
		dayIn.dispatchEvent(new Event('input'));
		monthIn.dispatchEvent(new Event('input'));
		yearIn.dispatchEvent(new Event('input'));

		dayIn.dispatchEvent(new InputEvent("input", { inputType: "deleteContentForward" }));
		expect(value()).not.toBeTruthy();

		// None of these should be called
		dayIn.dispatchEvent(new KeyboardEvent("keydown", { key: "Delete" }));
		expect(dayInSpy).toBeCalledTimes(1);
		expect(monthInSpy).toBeCalledTimes(1);
		expect(yearInSpy).toBeCalledTimes(0);

	});

	test("focusLastInput -- en-GB", () => {
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
		const dayInSpy = jest.spyOn(dayIn, 'focus');
		const monthInSpy = jest.spyOn(monthIn, 'focus');
		const firstInput = root.querySelector('input') as HTMLInputElement;
		expect(firstInput).not.toBeNull();
		const inputContainer = firstInput.closest('.flex') as HTMLElement;
		expect(inputContainer).not.toBeNull();

		inputContainer.dispatchEvent(new Event('click'));

		expect(dayInSpy).toBeCalledTimes(1);
		monthIn.dispatchEvent(new Event('focus'));

		root.dispatchEvent(new Event('click'));
		expect(monthInSpy).toBeCalledTimes(0);
		inputContainer.dispatchEvent(new Event('click'));
		expect(monthInSpy).toBeCalledTimes(1);

	});

	test("focusLastInput -- ja-JP", () => {
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
					options: [{ value: "ja-JP" }]
				},
				value,
				xform
			})
		});

		const yearIn = root.querySelector("#test-yyyy") as HTMLInputElement;
		const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
		const yearInSpy = jest.spyOn(yearIn, 'focus');
		const monthInSpy = jest.spyOn(monthIn, 'focus');
		const firstInput = root.querySelector('input') as HTMLInputElement;
		expect(firstInput).not.toBeNull();
		const inputContainer = firstInput.closest('.flex') as HTMLElement;
		expect(inputContainer).not.toBeNull();

		inputContainer.dispatchEvent(new Event('click'));

		expect(yearInSpy).toBeCalledTimes(1);
		monthIn.dispatchEvent(new Event('focus'));

		root.dispatchEvent(new Event('click'));
		expect(monthInSpy).toBeCalledTimes(0);
		inputContainer.dispatchEvent(new Event('click'));
		expect(monthInSpy).toBeCalledTimes(1);

	});
});

