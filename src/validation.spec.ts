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
