import { fileInvalid } from "./validation";

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
