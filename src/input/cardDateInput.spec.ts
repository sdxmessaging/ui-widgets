import m from "mithril";
import stream from "mithril/stream";
import { CardDateInput } from "./cardDateInput";

describe("CardDateInput", () => {

	afterEach(() => {
		jest.restoreAllMocks();
	});

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
			view: () => [
				m(CardDateInput, {
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
				}),
				m(CardDateInput, {
					field: {
						id: "test2",
						label: "Test Label",
						name: "Test Name",
						title: "Test Title",
						uiClass: {},
						disabled: true
					},
					value,
					xform
				}),
			]
		});
		expect(root.childNodes.length).toBe(2);
		// Get month input and update value
		const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
		const yearIn = root.querySelector("#test-yy") as HTMLInputElement;

		const monthIn2 = root.querySelector("#test2-mm") as HTMLInputElement;
		const yearIn2 = root.querySelector("#test2-yy") as HTMLInputElement;

		expect(monthIn != null).toBe(true);
		expect(yearIn != null).toBe(true);

		monthIn.value = "02";
		monthIn.dispatchEvent(new Event("input"));

		expect(value()).toBe("");

		yearIn.value = '20';
		yearIn.dispatchEvent(new Event("input"));
		// Verify change
		expect(value()).toBe("02/20");

		// Test two-way date binding
		m.redraw.sync();
		expect(yearIn2.value).toEqual("20");
		expect(monthIn2.value).toEqual('02');

		// Test reset date value for other inputs sharing the same value stream
		yearIn2.value = '';
		yearIn2.dispatchEvent(new Event("input"));

		m.redraw.sync();
		expect(yearIn.value).not.toBeTruthy();
		expect(monthIn.value).not.toBeTruthy();

		expect(monthIn2.value).toBe('02');

		yearIn2.value = '21';
		monthIn2.value = '11';
		yearIn2.dispatchEvent(new Event('input'));
		monthIn2.dispatchEvent(new Event('input'));
		m.redraw.sync();
		expect(yearIn.value).toBe('21');
		expect(monthIn.value).toBe('11');
		expect(yearIn2.value).toBe('21');
		expect(monthIn.value).toBe('11');

		// edit the other set of date field
		yearIn.value = '';
		yearIn.dispatchEvent(new Event('input'));
		m.redraw.sync();
		expect(yearIn2.value).toBe('');
		expect(monthIn2.value).toBe('');
		expect(monthIn.value).toBe('11');

		monthIn.value = "02";
		yearIn.value = "99";
		monthIn.dispatchEvent(new Event("input"));
		yearIn.dispatchEvent(new Event("input"));
		expect(value()).toBe("02/99");

		monthIn.value = "13";
		yearIn.value = "00";
		monthIn.dispatchEvent(new Event("input"));
		yearIn.dispatchEvent(new Event("input"));
		expect(value()).toBe("");

		monthIn.value = "00";
		monthIn.dispatchEvent(new Event("input"));
		expect(value()).toBe("");

		monthIn.value = "01";
		yearIn.value = "00";
		monthIn.dispatchEvent(new Event("input"));
		yearIn.dispatchEvent(new Event("input"));
		expect(value()).toBe("01/00");

		yearIn.value = "0";
		yearIn.dispatchEvent(new Event("input"));
		expect(value()).toBe("");

		// Cleanup
		m.mount(root, null);
	});

	test('autoRetreat', () => {
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
		const yearIn = root.querySelector("#test-yy") as HTMLInputElement;
		const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
		const monthInSpy = jest.spyOn(monthIn, 'focus');
		const yearInSpy = jest.spyOn(yearIn, 'focus');
		yearIn.dispatchEvent(new InputEvent("input", { inputType: "deleteContentForward" }));
		expect(value()).not.toBeTruthy();
		expect(monthInSpy).toBeCalledTimes(0);

		yearIn.dispatchEvent(new KeyboardEvent("keydown", { key: "Backspace" }));
		expect(monthInSpy).toBeCalledTimes(1);

		monthIn.dispatchEvent(new KeyboardEvent("keydown", { key: "BackSpace" }));
		expect(yearInSpy).toBeCalledTimes(0);
	});

	test("focusLastInput", () => {
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
					disabled: true,
				},
				value,
				xform
			})
		});

		const yearIn = root.querySelector("#test-yy") as HTMLInputElement;
		const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
		const yearInSpy = jest.spyOn(yearIn, 'focus');
		const monthInSpy = jest.spyOn(monthIn, 'focus');
		const firstInput = root.querySelector('input') as HTMLInputElement;
		expect(firstInput).not.toBeNull();
		const inputContainer = firstInput.closest('.flex-auto') as HTMLElement;
		expect(inputContainer).not.toBeNull();

		inputContainer.dispatchEvent(new Event('click'));

		expect(monthInSpy).toBeCalledTimes(1);
		yearIn.dispatchEvent(new Event('focus'));

		root.dispatchEvent(new Event('click'));
		expect(yearInSpy).toBeCalledTimes(0);
		inputContainer.dispatchEvent(new Event('click'));
		expect(yearInSpy).toBeCalledTimes(1);

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

	test("appendZeroToDayMonth", () => {
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
				},
				value,
				xform
			})
		});
		const monthIn = root.querySelector("#test-mm") as HTMLInputElement;

		monthIn.value = '1';
		monthIn.dispatchEvent(new Event('input'));
		monthIn.dispatchEvent(new Event('blur'));
		m.redraw.sync();
		expect(monthIn.value).toEqual("01");

		monthIn.value = '0';
		monthIn.dispatchEvent(new Event('input'));
		monthIn.dispatchEvent(new Event('blur'));
		m.redraw.sync();
		expect(monthIn.value).toEqual("0");

		const yearIn = root.querySelector("#test-yy") as HTMLInputElement;
		yearIn.value = '2';
		yearIn.dispatchEvent(new Event('input'));
		yearIn.dispatchEvent(new Event('blur'));
		m.redraw.sync();
		expect(yearIn.value).toEqual('2');
	});

	test("literal advance", () => {
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
				},
				value,
				xform
			})
		});
		const yearIn = root.querySelector("#test-yy") as HTMLInputElement;
		const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
		const monthInSpy = jest.spyOn(monthIn, 'focus');
		const yearInSpy = jest.spyOn(yearIn, 'focus');

		yearIn.dispatchEvent(new KeyboardEvent('keydown', { key: "/" }));
		expect(monthInSpy).toBeCalledTimes(0);

		yearIn.value = '1';
		yearIn.dispatchEvent(new Event('input'));
		expect(monthInSpy).toBeCalledTimes(0);

		yearIn.dispatchEvent(new KeyboardEvent('keydown', { key: "." }));
		expect(monthInSpy).toBeCalledTimes(0);

		yearIn.dispatchEvent(new KeyboardEvent('keydown', { key: "/" }));
		expect(monthInSpy).toBeCalledTimes(0);

		monthIn.value = '2';
		monthIn.dispatchEvent(new Event('input'));
		expect(yearInSpy).toBeCalledTimes(0);

		monthIn.dispatchEvent(new KeyboardEvent('keydown', { key: "/" }));
		expect(yearInSpy).toBeCalledTimes(1);

	});

	test("Validate Date - Set Custom Validity Message for required card date input", () => {
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
					required: true
				},
				value,
				xform
			})
		});

		/* 
			Rules: 
				- Month takes precedence, then Year
				- Every time validation happens, the other input call setCustomValidity to reset value,
				only the invalid one will have a message
				- Reset to broswer's default validity message when field is required and fields are empty
			Scenario:
		*/

		const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
		const yearIn = root.querySelector("#test-yy") as HTMLInputElement;


		monthIn.value = "0";
		monthIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("Please check the month.");
		expect(yearIn.validationMessage).toEqual("Constraints not satisfied");

		monthIn.value = "01";
		monthIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("");
		expect(yearIn.validationMessage).toEqual("Please check the year.");

		monthIn.value = '';
		monthIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("Constraints not satisfied");
		expect(yearIn.validationMessage).toEqual("Constraints not satisfied");

		monthIn.value = '12';
		monthIn.dispatchEvent(new Event('input'));
		yearIn.value = '21';
		yearIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("");
		expect(yearIn.validationMessage).toEqual("");

	});

	test("Validate Date - Set Custom Validity Message for non-required card date input", () => {
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
				},
				value,
				xform
			})
		});

		/* 
			Rules: 
				- Month takes precedence, then Year
				- Every time validation happens, the other input call setCustomValidity to reset value,
				only the invalid one will have a message
				- All inputs should be valid if they are all empty and not required
			Scenario:
		*/

		const monthIn = root.querySelector("#test-mm") as HTMLInputElement;
		const yearIn = root.querySelector("#test-yy") as HTMLInputElement;


		monthIn.value = "0";
		monthIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("Please check the month.");
		expect(yearIn.validationMessage).toEqual("");

		monthIn.value = "01";
		monthIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("");
		expect(yearIn.validationMessage).toEqual("Please check the year.");

		monthIn.value = "";
		yearIn.value = "";
		monthIn.dispatchEvent(new Event('input'));
		yearIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("");
		expect(yearIn.validationMessage).toEqual("");

		monthIn.value = '12';
		monthIn.dispatchEvent(new Event('input'));
		yearIn.value = '21';
		yearIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("");
		expect(yearIn.validationMessage).toEqual("");

		monthIn.value = '';
		monthIn.dispatchEvent(new Event('input'));
		expect(monthIn.validationMessage).toEqual("Please check the month.");
		expect(yearIn.validationMessage).toEqual("");
	});

	test("setAllValidationMessage - edge case: no dom/preload values", () => {
		const root = window.document.createElement("div");
		// Preload value means dom is not present when validation happens
		const value = stream<string>("09/21");
		const xform = value.map((val) => val);
		const cardDateInputClass = new CardDateInput();
		m.mount(root, {
			view: () => m(cardDateInputClass, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					uiClass: {},
					required: true
				},
				value,
				xform
			})
		});

		expect(cardDateInputClass['valid']()).toEqual(true);
	});
});
