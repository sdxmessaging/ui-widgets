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
				},
				value,
				xform
			})
		});
		expect(root.childNodes.length).toBe(1);
		// Label + Input
		expect(root.childNodes[0].childNodes.length).toBe(2);
		const dayIn = root.querySelector("#test-dd") as HTMLInputElement;
		const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
		const yearIn = root.querySelector("#test-yyyy") as HTMLInputElement;
		expect(dayIn).toBeTruthy();
		expect(monthIn).toBeTruthy();
		expect(yearIn).toBeTruthy();

		// regex rule test
		dayIn.value = "aa";
		monthIn.value = "aa";
		yearIn.value = "1899";

		dayIn.dispatchEvent(new Event("input"));
		monthIn.dispatchEvent(new Event("input"));
		yearIn.dispatchEvent(new Event("input"));

		// value stream is empty when it's invalid
		expect(value()).toEqual("");

		dayIn.value = "00";
		monthIn.value = "00";
		yearIn.value = "1900";

		dayIn.dispatchEvent(new Event("input"));
		monthIn.dispatchEvent(new Event("input"));
		yearIn.dispatchEvent(new Event("input"));

		expect(value()).toEqual("");

		// valid date
		dayIn.value = "31";
		monthIn.value = "12";
		yearIn.value = "2020";

		dayIn.dispatchEvent(new Event("input"));
		monthIn.dispatchEvent(new Event("input"));
		yearIn.dispatchEvent(new Event("input"));

		expect(value()).toBe("2020-12-31");

		// emptying a single input
		dayIn.value = "";
		monthIn.value = "12";

		dayIn.dispatchEvent(new Event("input"));
		monthIn.dispatchEvent(new Event("input"));

		expect(value()).toEqual("");

		// value must be positive
		dayIn.value = "-1";
		monthIn.value = "-1";

		dayIn.dispatchEvent(new Event("input"));
		monthIn.dispatchEvent(new Event("input"));

		expect(value()).toEqual("");

		// Cleanup
		m.mount(root, null);
	});

	test("setLocale", () => {
		const dateInput = new DateInput();
		dateInput["locale"]("en-GB");
		dateInput['setLocale']({
			dateLocale: "zh-HK"
		});
		expect(dateInput["locale"]()).toEqual('zh-HK');
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
						config: { dateLocale: "en-GB" }
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
						config: { dateLocale: "en-GB" }
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

		// auto advance should select all characters (like the native tabbing behaviour)
		const monthInSelectSpy = jest.spyOn(monthIn, 'select');
		const yearInSelectSpy = jest.spyOn(yearIn, 'select');

		const dayIn2 = root.querySelector("#test2-dd") as HTMLInputElement;
		const monthIn2 = root.querySelector("#test2-mm") as HTMLInputElement;
		const yearIn2 = root.querySelector("#test2-yyyy") as HTMLInputElement;

		// only auto advance when reaching max length
		dayIn.value = "0";
		dayIn.dispatchEvent(new Event("input"));
		expect(monthInSpy).toBeCalledTimes(0);
		expect(monthInSelectSpy).toBeCalledTimes(0);
		expect(yearInSpy).toBeCalledTimes(0);
		expect(yearInSelectSpy).toBeCalledTimes(0);

		// should auto advance
		dayIn.value = "01";
		dayIn.dispatchEvent(new Event("input"));
		expect(monthInSpy).toBeCalledTimes(1);
		expect(monthInSelectSpy).toBeCalledTimes(1);
		expect(yearInSpy).toBeCalledTimes(0);

		monthIn.value = "02";
		monthIn.dispatchEvent(new Event("input"));
		expect(yearInSpy).toBeCalledTimes(1);
		expect(yearInSelectSpy).toBeCalledTimes(1);

		// in this current locale, year shouldn't auto advance
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

		// Test reset date value for other inputs sharing the same value stream when invalid
		yearIn2.value = '';
		yearIn2.dispatchEvent(new Event("input"));

		m.redraw.sync();
		expect(yearIn.value).not.toBeTruthy();
		expect(monthIn.value).not.toBeTruthy();
		expect(dayIn.value).not.toBeTruthy();

		expect(dayIn2.value).toBe('01');
		expect(monthIn2.value).toBe('02');

		yearIn.value = '2021';
		monthIn.value = '11';
		dayIn.value = '15';
		yearIn.dispatchEvent(new Event("input"));
		monthIn.dispatchEvent(new Event("input"));
		dayIn.dispatchEvent(new Event("input"));

		expect(value()).toEqual('2021-11-15');
		m.redraw.sync();
		expect(yearIn2.value).toBe('2021');
		expect(monthIn2.value).toBe('11');
		expect(dayIn2.value).toBe('15');

		// edit the other set of date field
		dayIn2.value = '';
		dayIn2.dispatchEvent(new Event("input"));
		m.redraw.sync();
		expect(yearIn.value).toBe('');
		expect(monthIn.value).toBe('');
		expect(dayIn.value).toBe('');
		expect(monthIn2.value).toBe('11');
		expect(yearIn2.value).toBe('2021');

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
					config: { dateLocale: "en-US" }
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

		// checking the order of auto advance for a different locale
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
					config: { dateLocale: "en-GB" }
				},
				value,
				xform
			})
		});

		// same principle as auto advance but reverse
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
					config: { dateLocale: "en-GB" }
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

		// clicking on parent container/label should focus on the last focused input
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
					config: { dateLocale: "ja-JP" }
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

	test("appendZeroToDayMonth", () => {
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
					config: { dateLocale: "ja-JP" }
				},
				value,
				xform
			})
		});
		const dayIn = root.querySelector("#test-dd") as HTMLInputElement;
		const monthIn = root.querySelector("#test-mm") as HTMLInputElement;

		// append 0 when field value is bigger than 0
		dayIn.value = '1';
		dayIn.dispatchEvent(new Event('input'));
		dayIn.dispatchEvent(new Event('blur'));
		m.redraw.sync();
		expect(dayIn.value).toEqual("01");

		// should not append 0 for 0s
		dayIn.value = '0';
		dayIn.dispatchEvent(new Event('input'));
		dayIn.dispatchEvent(new Event('blur'));
		m.redraw.sync();
		expect(dayIn.value).toEqual("0");

		monthIn.value = '1';
		monthIn.dispatchEvent(new Event('input'));
		monthIn.dispatchEvent(new Event('blur'));
		m.redraw.sync();
		expect(monthIn.value).toEqual("01");

		// year inputs should not have the appending behaviour
		const yearIn = root.querySelector("#test-yyyy") as HTMLInputElement;
		yearIn.value = '1';
		yearIn.dispatchEvent(new Event('input'));
		yearIn.dispatchEvent(new Event('blur'));
		m.redraw.sync();
		expect(yearIn.value).toEqual('1');

	});

	test("literal advance - en-GB", () => {
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
					config: { dateLocale: "en-GB" }
				},
				value,
				xform
			})
		});
		const dayIn = root.querySelector("#test-dd") as HTMLInputElement;
		const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
		const yearIn = root.querySelector("#test-yyyy") as HTMLInputElement;

		const dayInSpy = jest.spyOn(dayIn, 'focus');
		const monthInSpy = jest.spyOn(monthIn, 'focus');
		const yearInSpy = jest.spyOn(yearIn, 'focus');

		// for the current locale, pressing '/' when there's value should auto advance
		dayIn.dispatchEvent(new KeyboardEvent('keydown', { key: "/" }));
		expect(monthInSpy).toBeCalledTimes(0);
		expect(yearInSpy).toBeCalledTimes(0);

		dayIn.value = '1';
		dayIn.dispatchEvent(new Event('input'));
		expect(monthInSpy).toBeCalledTimes(0);
		expect(yearInSpy).toBeCalledTimes(0);

		// wrong key
		dayIn.dispatchEvent(new KeyboardEvent('keydown', { key: "." }));
		expect(monthInSpy).toBeCalledTimes(0);
		expect(yearInSpy).toBeCalledTimes(0);

		dayIn.dispatchEvent(new KeyboardEvent('keydown', { key: "/" }));
		expect(monthInSpy).toBeCalledTimes(1);
		expect(yearInSpy).toBeCalledTimes(0);

		monthIn.value = '2';
		monthIn.dispatchEvent(new Event('input'));
		expect(yearInSpy).toBeCalledTimes(0);
		expect(dayInSpy).toBeCalledTimes(0);
		monthIn.dispatchEvent(new KeyboardEvent('keydown', { key: "/" }));
		expect(yearInSpy).toBeCalledTimes(1);
		expect(dayInSpy).toBeCalledTimes(0);

		yearIn.value = '2';
		yearIn.dispatchEvent(new Event('input'));
		expect(dayInSpy).toBeCalledTimes(0);
		expect(monthInSpy).toBeCalledTimes(1);
		// for this current locale, year should not advance
		yearIn.dispatchEvent(new KeyboardEvent('keydown', { key: "/" }));
		expect(monthInSpy).toBeCalledTimes(1);
		expect(dayInSpy).toBeCalledTimes(0);

	});

	test("literal advance - ko-KR", () => {
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
					config: { dateLocale: "ko-KR" }
				},
				value,
				xform
			})
		});
		const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
		const yearIn = root.querySelector("#test-yyyy") as HTMLInputElement;

		const monthInSpy = jest.spyOn(monthIn, 'focus');

		// for this current locale, '.' is the advance key/literal
		yearIn.dispatchEvent(new KeyboardEvent('keydown', { key: "." }));
		expect(monthInSpy).toBeCalledTimes(0);

		yearIn.value = '1';
		yearIn.dispatchEvent(new Event('input'));
		expect(monthInSpy).toBeCalledTimes(0);

		// wrong key
		yearIn.dispatchEvent(new KeyboardEvent('keydown', { key: "/" }));
		expect(monthInSpy).toBeCalledTimes(0);

		// for this locale, year should advance
		yearIn.dispatchEvent(new KeyboardEvent('keydown', { key: "." }));
		expect(monthInSpy).toBeCalledTimes(1);
	});

	test("Validate Date - Set Custom Validity Message for required date input", () => {
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
					required: true,
					uiClass: {},
					config: { dateLocale: "en-GB" }
				},
				value,
				xform
			})
		});

		/* 
			Rules: 
				- Month takes precedence, then Day, then Year
				- Every time validation happens, the other 2 inputs call setCustomValidity to reset value,
				only the invalid one will have a message
				- Reset to broswer's default validity message when field is required and fields are empty
			Scenario:
		*/

		const dayIn = root.querySelector("#test-dd") as HTMLInputElement;
		const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
		const yearIn = root.querySelector("#test-yyyy") as HTMLInputElement;

		monthIn.value = "0";
		monthIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("Please check the month.");
		expect(yearIn.validationMessage).toEqual("Constraints not satisfied");
		expect(dayIn.validationMessage).toEqual("Constraints not satisfied");


		monthIn.value = "01";
		monthIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("");
		expect(yearIn.validationMessage).toEqual("Constraints not satisfied");
		expect(dayIn.validationMessage).toEqual("Please check the day.");

		dayIn.value = '00';
		dayIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("");
		expect(yearIn.validationMessage).toEqual("Constraints not satisfied");
		expect(dayIn.validationMessage).toEqual("Please check the day.");

		dayIn.value = '28';
		dayIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("");
		expect(yearIn.validationMessage).toEqual("Year must be greater than 1900.");
		expect(dayIn.validationMessage).toEqual("");

		yearIn.value = '199';
		yearIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("");
		expect(yearIn.validationMessage).toEqual("Year must be greater than 1900.");
		expect(dayIn.validationMessage).toEqual("");

		yearIn.value = '1997';
		yearIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("");
		expect(yearIn.validationMessage).toEqual("");
		expect(dayIn.validationMessage).toEqual("");

		monthIn.value = "";
		yearIn.value = "";
		dayIn.value = "";

		dayIn.dispatchEvent(new Event('input'));
		monthIn.dispatchEvent(new Event('input'));
		yearIn.dispatchEvent(new Event('input'));
		// Default broswer validity message
		expect(monthIn.validationMessage).toEqual("Constraints not satisfied");
		expect(yearIn.validationMessage).toEqual("Constraints not satisfied");
		expect(dayIn.validationMessage).toEqual("Constraints not satisfied");

	});

	test("Validate Date - Set Custom Validity Message for non-required date input", () => {
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
					config: { dateLocale: "en-GB" }
				},
				value,
				xform
			})
		});

		/* 
			Rules: 
				- Month takes precedence, then Day, then Year
				- Every time validation happens, the other 2 inputs call setCustomValidity to reset value,
				only the invalid one will have a message
				- All inputs should be valid if they are all empty and not required
			Scenario:
		*/

		const dayIn = root.querySelector("#test-dd") as HTMLInputElement;
		const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
		const yearIn = root.querySelector("#test-yyyy") as HTMLInputElement;

		monthIn.value = "0";
		monthIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("Please check the month.");
		expect(yearIn.validationMessage).toEqual("");
		expect(dayIn.validationMessage).toEqual("");

		monthIn.value = "01";
		monthIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("");
		expect(yearIn.validationMessage).toEqual("");
		expect(dayIn.validationMessage).toEqual("Please check the day.");

		dayIn.value = "28";
		dayIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("");
		expect(yearIn.validationMessage).toEqual("Year must be greater than 1900.");
		expect(dayIn.validationMessage).toEqual("");

		yearIn.value = "1997";
		yearIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("");
		expect(yearIn.validationMessage).toEqual("");
		expect(dayIn.validationMessage).toEqual("");

		monthIn.value = "";
		yearIn.value = "";
		dayIn.value = "";

		// empty and not required = valid date input
		dayIn.dispatchEvent(new Event('input'));
		monthIn.dispatchEvent(new Event('input'));
		yearIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("");
		expect(yearIn.validationMessage).toEqual("");
		expect(dayIn.validationMessage).toEqual("");

	});

	test("setAllValidationMessage - edge case: no dom/preload values", () => {
		const root = window.document.createElement("div");
		// Preload value means dom is not present when validation happens
		const value = stream<string>("2021-12-01");
		const xform = value.map((val) => val);
		const dateInputClass = new DateInput();
		m.mount(root, {
			view: () => m(dateInputClass, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					required: true,
					uiClass: {},
					config: { dateLocale: "en-GB" }
				},
				value,
				xform
			})
		});

		expect(dateInputClass['valid']()).toEqual(true);
	});
});
