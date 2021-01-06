const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, TProp } from "../interface/widget";

import { CurrencyInput, currencyStrToNumber, numberToCurrencyStr, setCurrencyValue } from "./currencyInput";

o.spec("CurrencyInput", () => {

	o("minimal + empty stream", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>();
		m.mount(root, {
			view: () => m(CurrencyInput, {
				field: {
					id: "test"
				},
				value
			})
		});
		// Input only
		o(root.childNodes.length).equals(1);
	});

	o("minimal + string stream", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("1");
		m.mount(root, {
			view: () => m(CurrencyInput, {
				field: {
					id: "test"
				},
				value
			})
		});
		// Input only
		o(root.childNodes.length).equals(1);
	});

	o("configured + number stream", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>(1);
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
		o(root.childNodes.length).equals(1);
	});

});

o.spec("currencyStrToNumber", () => {

	o("empty", () => {
		o(currencyStrToNumber("")).equals(0);
	});

	o("subunit - 1 place", () => {
		o(currencyStrToNumber(".1")).equals(10);
	});

	o("subunit - 2 places", () => {
		o(currencyStrToNumber(".01")).equals(1);
	});

	o("full - no subunit", () => {
		o(currencyStrToNumber("1")).equals(100);
	});

	o("full - 1 place", () => {
		o(currencyStrToNumber("1.1")).equals(110);
	});

	o("full - 2 places", () => {
		o(currencyStrToNumber("1.01")).equals(101);
	});

	o("full - large number", () => {
		o(currencyStrToNumber("1234567.89")).equals(123456789);
	});

	o("Additional text", () => {
		o(currencyStrToNumber(" Value: £10.01p\n")).equals(1001);
	});

	o("Multiple decimal points", () => {
		o(currencyStrToNumber("10.0.01")).equals(1000);
	});
});

o.spec("numberToCurrencyStr", () => {

	o("non-finite", () => {
		o(numberToCurrencyStr((undefined as unknown) as number)).equals(undefined);
		o(numberToCurrencyStr(Number.POSITIVE_INFINITY)).equals(undefined);
	});

	o("zero", () => {
		o(numberToCurrencyStr(0)).equals("0.00");
	});

	o("< 10", () => {
		o(numberToCurrencyStr(1)).equals("0.01");
	});

	o("< 100", () => {
		o(numberToCurrencyStr(10)).equals("0.10");
	});

	o("> 100", () => {
		o(numberToCurrencyStr(110)).equals("1.10");
	});

	o("large number", () => {
		o(numberToCurrencyStr(123456789)).equals("1234567.89");
	});

});

o.spec("setCurrencyValue", () => {

	o("Update value", () => {
		const value: stream<TProp> = stream<TProp>();
		const mod = setCurrencyValue(value);
		const input = window.document.createElement("input");
		input.value = "1";
		mod({ target: input });
		o(value()).equals(100);
	});

});
