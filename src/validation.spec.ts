import { propInvalid, fileInvalid, patternInvalid } from "./validation";

describe("patternInvalid", () => {
	test("pattern match", () => {
		expect(patternInvalid("abc","i know my abc's")).toBe(false);
		expect(patternInvalid("abc","slabcraft")).toBe(false);
		expect(patternInvalid("a(b+)(c|d)[efgh][^i-k]","abbbcfx")).toBe(false);
	});
	test("pattern mismatch", () => {
		expect(patternInvalid("abc","def")).toBe(true);
		expect(patternInvalid("abc","grab crab")).toBe(true);
		expect(patternInvalid("a(b+)(c|d)[efgh][^i-k]","abbbcfi")).toBe(true);
	});
});

describe("propInvalid", () => {
	test("required", () => {
		expect(propInvalid({
			id: "test",
		}, "")).toBe(false);
		expect(propInvalid({
			id: "test",
			required: true
		}, "")).toBe(true);
	});
	test("range", () => {
		expect(propInvalid({
			id: "test",
			max: 3,
			min: 1
		}, 2)).toBe(false);
		expect(propInvalid({
			id: "test",
			max: 2,
			min: 1
		}, 3)).toBe(true);
	});
	test("length", () => {
		expect(propInvalid({
			id: "test",
			maxlength: 3,
			minlength: 1
		}, "be")).toBe(false);
		expect(propInvalid({
			id: "test",
			maxlength: 2,
			minlength: 1
		}, "ben")).toBe(true);
	});
	test("pattern", () => {
		expect(propInvalid({
			id: "test",
			pattern: "a(b+)(c|d)[efgh][^i-k]"
		}, "abbbcex")).toBe(false);
		expect(propInvalid({
			id: "test",
			pattern: "a(b+)(c|d)[efgh][^i-k]"
		}, "abbbcei")).toBe(true);
	});
});

describe("fileInvalid", () => {

	test("required", () => {
		expect(fileInvalid({
			id: "test",
		}, [])).toBe(false);
		expect(fileInvalid({
			id: "test",
			required: true
		}, [])).toBe(true);
	});

});
