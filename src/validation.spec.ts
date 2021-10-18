import { propInvalid, fileInvalid, rangeInvalid , lengthInvalid} from "./validation";

describe("rangeInvalid", () => {
	test("in range", () => {
		expect(rangeInvalid(1, 3, 2)).toBe(false);
		expect(rangeInvalid(-1, 1, 0)).toBe(false);
		expect(rangeInvalid(1, 1, 1)).toBe(false);
	});
	test("out of range", () => {
		expect(rangeInvalid(1, 2, 3)).toBe(true);
		expect(rangeInvalid(-2, 0, -3)).toBe(true);
	});
});

describe("lengthInvalid", () => {
	test("in range", () => {
		expect(lengthInvalid(1, 3, "be")).toBe(false);
		expect(lengthInvalid(0, 1, "")).toBe(false);
		expect(lengthInvalid(1, 1, "a")).toBe(false);
	});
	test("out of range", () => {
		expect(rangeInvalid(1, 2, 3)).toBe(true);
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
	})
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
