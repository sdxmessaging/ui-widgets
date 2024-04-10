import { Currency } from "./currency";

describe("format", () => {

	describe("parentheses", () => {
		test("positive", () => {
			expect(Currency.format(1, true)).toBe("0.01");
		});
		test("negative", () => {
			expect(Currency.format(-1, true)).toBe("(0.01)");
		});
		test("zero", () => {
			expect(Currency.format(0, true)).toBe("0.00");
			expect(Currency.format(-0, true)).toBe("0.00");
		});
	});

	describe("default", () => {
		test("positive", () => {
			expect(Currency.format(1)).toBe("0.01");
		});
		test("negative", () => {
			expect(Currency.format(-1)).toBe("-0.01");
		});
		test("zero", () => {
			expect(Currency.format(0)).toBe("0.00");
			expect(Currency.format(-0)).toBe("0.00");
		});
	});
});

describe("String -> Number", () => {

	test("empty", () => {
		expect(Currency.strToNum("")).toBe(0);
	});

	test("subunit - 1 place", () => {
		expect(Currency.strToNum(".1")).toBe(10);
	});

	test("subunit - 2 places", () => {
		expect(Currency.strToNum(".01")).toBe(1);
	});

	test("full - no subunit", () => {
		expect(Currency.strToNum("1")).toBe(100);
	});

	test("full - 1 place", () => {
		expect(Currency.strToNum("1.1")).toBe(110);
	});

	test("full - 2 places", () => {
		expect(Currency.strToNum("1.01")).toBe(101);
	});

	test("full - large number", () => {
		expect(Currency.strToNum("1,234,567.89")).toBe(123456789);
	});

	test("additional text", () => {
		expect(Currency.strToNum(" Value: £10.01p\n")).toBe(1001);
	});

	test("multiple decimal points", () => {
		expect(Currency.strToNum("10.0.01")).toBe(1000);
	});

	test("brackets", () => {
		expect(Currency.strToNum("(1.01)")).toBe(-101);
	});

	test("negative", () => {
		expect(Currency.strToNum("-1,001.01")).toBe(-100101);
	});

});

describe("Number -> String", () => {

	test("non-finite", () => {
		expect(Currency.numtoStr((undefined as unknown) as number)).toBeUndefined();
		expect(Currency.numtoStr(Number.POSITIVE_INFINITY)).toBeUndefined();
	});

	test("zero", () => {
		expect(Currency.numtoStr(0)).toBe("0.00");
	});

	test("< 10", () => {
		expect(Currency.numtoStr(1)).toBe("0.01");
	});

	test("< 100", () => {
		expect(Currency.numtoStr(10)).toBe("0.10");
	});

	test("> 100", () => {
		expect(Currency.numtoStr(110)).toBe("1.10");
	});

	test("large number", () => {
		// Get number grouping separator
		const formatter = new Intl.NumberFormat();
		const parts = formatter.formatToParts(1000);
		const { value: grp } = parts[1];
		expect(Currency.numtoStr(123456789)).toBe(`1${grp}234${grp}567.89`);
	});

});
