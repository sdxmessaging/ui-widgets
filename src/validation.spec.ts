import { propInvalid, fileInvalid, patternInvalid, rangeInvalid } from "./validation";

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

describe("rangeInvalid", () => {
	test("min", () => {
		expect(rangeInvalid({id: "test", min: 0},8)).toBe(false);
		expect(rangeInvalid({id: "test", min: -5},5)).toBe(false);
		expect(rangeInvalid({id: "test", min: 0},0)).toBe(false);
		expect(rangeInvalid({id: "test", min: 1},0)).toBe(true);
		expect(rangeInvalid({id: "test", min: 10},8)).toBe(true);
	});
	test("minlength", () => {
		expect(rangeInvalid({id: "test", minlength: 0},"aaaaaaaa")).toBe(false);
		expect(rangeInvalid({id: "test", minlength: -5},"aaaaa")).toBe(false);
		expect(rangeInvalid({id: "test", minlength: 0},"")).toBe(false);
		expect(rangeInvalid({id: "test", minlength: 1},"")).toBe(true);
		expect(rangeInvalid({id: "test", minlength: 10},"aaaaaaaa")).toBe(true);
	});
	test("min", () => {
		expect(rangeInvalid({id: "test", max: 10},8)).toBe(false);
		expect(rangeInvalid({id: "test", max: -5},-10)).toBe(false);
		expect(rangeInvalid({id: "test", max: 0},0)).toBe(false);
		expect(rangeInvalid({id: "test", max: 0},1)).toBe(true);
		expect(rangeInvalid({id: "test", max: 8},10)).toBe(true);
	});
	test("minlength", () => {
		expect(rangeInvalid({id: "test", maxlength: 10},"aaaaaaaa")).toBe(false);
		expect(rangeInvalid({id: "test", maxlength: -5},"aaaaa")).toBe(true);
		expect(rangeInvalid({id: "test", maxlength: 0},"")).toBe(false);
		expect(rangeInvalid({id: "test", maxlength: 1},"")).toBe(false);
		expect(rangeInvalid({id: "test", maxlength: 0},"aaaaaaaa")).toBe(true);
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
