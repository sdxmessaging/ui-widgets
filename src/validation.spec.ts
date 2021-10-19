import { propInvalid, fileInvalid } from "./validation";

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
