import m from "mithril";
import stream from "mithril/stream";

import { FieldType } from "../interface/widget";

import { CurrencyInput, currencyStrToNumber, numberToCurrencyStr, setCurrencyValue } from "./currencyInput";

describe("CurrencyInput", () => {

	test("minimal + empty stream", () => {
		const root = window.document.createElement("div");
		const value = stream<string>();
		m.mount(root, {
			view: () => m(CurrencyInput, {
				field: {
					id: "test"
				},
				value
			})
		});
		// Input only
		expect(root.childNodes.length).toBe(1);
	});

	test("minimal + string stream", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("1");
		m.mount(root, {
			view: () => m(CurrencyInput, {
				field: {
					id: "test"
				},
				value
			})
		});
		// Input only
		expect(root.childNodes.length).toBe(1);
	});

	test("configured + number stream", () => {
		const root = window.document.createElement("div");
		const value = stream<number>(1);
		const xform = value.map((val) => val);
		m.mount(root, {
			view: () => m(CurrencyInput, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					type: FieldType.currency,
					uiClass: {},
					disabled: true,
					instant: true,
					options: [{
						value: "£"
					}]
				},
				value,
				xform
			})
		});
		// Label + Input
		expect(root.childNodes.length).toBe(1);
	});

});

describe("currencyStrToNumber", () => {

	test("empty", () => {
		expect(currencyStrToNumber("")).toBe(0);
	});

	test("subunit - 1 place", () => {
		expect(currencyStrToNumber(".1")).toBe(10);
	});

	test("subunit - 2 places", () => {
		expect(currencyStrToNumber(".01")).toBe(1);
	});

	test("full - no subunit", () => {
		expect(currencyStrToNumber("1")).toBe(100);
	});

	test("full - 1 place", () => {
		expect(currencyStrToNumber("1.1")).toBe(110);
	});

	test("full - 2 places", () => {
		expect(currencyStrToNumber("1.01")).toBe(101);
	});

	test("full - large number", () => {
		expect(currencyStrToNumber("1234567.89")).toBe(123456789);
	});

	test("Additional text", () => {
		expect(currencyStrToNumber(" Value: £10.01p\n")).toBe(1001);
	});

	test("Multiple decimal points", () => {
		expect(currencyStrToNumber("10.0.01")).toBe(1000);
	});
});

describe("numberToCurrencyStr", () => {

	test("non-finite", () => {
		expect(numberToCurrencyStr((undefined as unknown) as number)).toBe(undefined);
		expect(numberToCurrencyStr(Number.POSITIVE_INFINITY)).toBe(undefined);
	});

	test("zero", () => {
		expect(numberToCurrencyStr(0)).toBe("0.00");
	});

	test("< 10", () => {
		expect(numberToCurrencyStr(1)).toBe("0.01");
	});

	test("< 100", () => {
		expect(numberToCurrencyStr(10)).toBe("0.10");
	});

	test("> 100", () => {
		expect(numberToCurrencyStr(110)).toBe("1.10");
	});

	test("large number", () => {
		expect(numberToCurrencyStr(123456789)).toBe("1234567.89");
	});

});

describe("setCurrencyValue", () => {

	test("Update value", () => {
		const value = stream<number>();
		const mod = setCurrencyValue(value);
		const input = window.document.createElement("input");
		input.value = "1";
		mod({ target: input });
		expect(value()).toBe(100);
	});

});
