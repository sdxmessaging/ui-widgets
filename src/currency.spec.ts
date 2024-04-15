import { Currency } from "./currency";

// Get number grouping separator
const formatter = new Intl.NumberFormat();
const parts = formatter.formatToParts(1000);
const { value: g } = parts[1];

describe("format", () => {
	const badNum = Number.POSITIVE_INFINITY;

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
		test("undefined", () => {
			expect(Currency.format(badNum)).toBeUndefined();
		});
		test("extreme", () => {
			expect(Currency.format(Number.MAX_SAFE_INTEGER))
				.toBe(`90${g}071${g}992${g}547${g}409.91`);
		});
	});

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
		test("undefined", () => {
			expect(Currency.format(badNum, true)).toBeUndefined();
		});
	});

	describe("invert", () => {
		test("positive", () => {
			expect(Currency.format(1, false, true)).toBe("-0.01");
		});
		test("negative", () => {
			expect(Currency.format(-1, false, true)).toBe("0.01");
		});
		test("zero", () => {
			expect(Currency.format(0, false, true)).toBe("0.00");
			expect(Currency.format(-0, false, true)).toBe("0.00");
		});
		test("undefined", () => {
			expect(Currency.format(badNum, false, true)).toBeUndefined();
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
		expect(Currency.strToNum("1234567.89")).toBe(123456789);
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
		expect(Currency.numtoStr(123456789)).toBe(`1234567.89`);
	});

});
