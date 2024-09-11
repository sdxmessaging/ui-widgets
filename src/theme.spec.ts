import { IField } from "./interface/widget";
import { fileInputWrapperCls, getButtonContext, inputCls, inputWrapperCls, labelCls, textareaCls, theme, updateButtonContext, updateClasses, wrapperCls } from "./theme";

describe("Theme", () => {

	test("Update", () => {
		updateClasses({
			label: "test"
		});
		expect(theme.label).toBe("test");
	});

});

describe("Button Context", () => {

	test("Default", () => {
		expect(getButtonContext()).toBe("bg-light-blue dark-gray");
	});

	test("Unknown", () => {
		expect(getButtonContext("unknown")).toBe("");
	});

	test("Set", () => {
		const testVal = "test";
		updateButtonContext({ "test": testVal });
		expect(getButtonContext("test")).toBe(testVal);
	});

	test("Update", () => {
		const testVal = "modified";
		updateButtonContext({ "test": testVal });
		expect(getButtonContext("test")).toBe(testVal);
	});

});

describe("Theme Classes", () => {

	// Set missing class for testing
	updateClasses({
		invalidInputWrapper: "invalid",
		requiredLabel: "required"
	});

	test("labelCls", () => {
		expect(labelCls({})).toBe(theme.label);
		expect(labelCls({ label: "test", merge: false }, true)).toBe(`test ${theme.requiredLabel}`);
	});

	test("inputCls", () => {
		expect(inputCls({})).toBe(theme.input);
		expect(inputCls({ input: "test", merge: false })).toBe("test");
	});

	test("fileInputWrapperCls", () => {
		// Merge classes
		const merge = { label: "test", merge: true };
		expect(fileInputWrapperCls(merge, false, false))
			.toBe(theme.fileInputWrapper);
		expect(fileInputWrapperCls(merge, true, false))
			.toBe(`${theme.fileInputWrapper} ${theme.fileHover}`);
		expect(fileInputWrapperCls(merge, false, true))
			.toBe(`${theme.fileInputWrapper} ${theme.invalidInputWrapper}`);
		expect(fileInputWrapperCls(merge, true, true))
			.toBe(`${theme.fileInputWrapper} ${theme.invalidInputWrapper} ${theme.fileHover}`);
		// Don't merge classes
		const noMerge = { label: "test", merge: false };
		expect(fileInputWrapperCls(noMerge, false, false))
			.toBe("");
		expect(fileInputWrapperCls(noMerge, true, false))
			.toBe(theme.fileHover);
		expect(fileInputWrapperCls(noMerge, false, true))
			.toBe(theme.invalidInputWrapper);
		expect(fileInputWrapperCls(noMerge, true, true))
			.toBe(`${theme.invalidInputWrapper} ${theme.fileHover}`);
	});

	test("textareaCls", () => {
		expect(textareaCls({})).toBe(theme.textarea);
		expect(textareaCls({ input: "test", merge: false })).toBe("test");
	});

	test("inputWrapper", () => {
		const exampleField: IField = { id: "test" };
		expect(inputWrapperCls(exampleField)).toBe(theme.inputWrapper);
		expect(inputWrapperCls(exampleField, true)).toBe(`${theme.inputWrapper} ${theme.invalidInputWrapper}`);
		expect(inputWrapperCls(exampleField, true, true)).toBe(`${theme.inputWrapper} ${theme.invalidInputWrapper}`);
		expect(inputWrapperCls({
			...exampleField,
			uiClass: {
				inputWrapper: "test",
				invalidInputWrapper: "customInvalid",
				merge: false
			}
		}, true)).toBe("test customInvalid");
		expect(inputWrapperCls({
			...exampleField,
			uiClass: {
				inputWrapper: "test",
				merge: false
			}
		})).toBe("test");
		// Continue to apply invalidInputWrapper as it is not overriden
		expect(inputWrapperCls({
			...exampleField,
			uiClass: {
				inputWrapper: "test",
				merge: false
			}
		}, true)).toBe(`test ${theme.invalidInputWrapper}`);
	});

	test("wrapperCls", () => {
		expect(wrapperCls({})).toBe(theme.wrapper);
		expect(wrapperCls({ wrapper: "test", merge: false })).toBe("test");
	});

});
