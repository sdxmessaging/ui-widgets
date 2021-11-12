import { fileHoverCls, theme, updateClasses } from "./theme";
import { getButtonContext, updateButtonContext } from "./theme";
import {
	labelCls,
	inputCls, fileInputWrapperCls, textareaCls, radioInputCls,
	inputWrapperCls, wrapperCls
} from "./theme";

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

	// Set invalid class for testing
	updateClasses({
		invalidInputWrapper: "invalid"
	});

	test("labelCls", () => {
		expect(labelCls({})).toBe(` ${theme.label} `);
		expect(labelCls({ label: "test", merge: false }, true)).toBe(`test  ${theme.requiredLabel}`);
	});

	test("inputCls", () => {
		expect(inputCls({})).toBe(` ${theme.input}`);
		expect(inputCls({ input: "test", merge: false })).toBe("test ");
	});

	test("fileInputWrapperCls", () => {
		expect(fileInputWrapperCls({ label: "test", merge: true }, false, false)).toBe(` ${theme.fileInputWrapper}  `);
		expect(fileInputWrapperCls({ label: "test", merge: true }, true, false)).toBe(` ${theme.fileInputWrapper}  ${theme.fileHover}`);
		expect(fileInputWrapperCls({ label: "test", merge: true }, false, true)).toBe(` ${theme.fileInputWrapper} ${theme.invalidInputWrapper} `);
		expect(fileInputWrapperCls({ label: "test", merge: true }, true, true)).toBe(` ${theme.fileInputWrapper} ${theme.invalidInputWrapper} ${theme.fileHover}`);
		expect(fileInputWrapperCls({ label: "test", merge: false }, false, false)).toBe(`   `);
		expect(fileInputWrapperCls({ label: "test", merge: false }, true, false)).toBe(`   ${theme.fileHover}`);
		expect(fileInputWrapperCls({ label: "test", merge: false }, false, true)).toBe(`  ${theme.invalidInputWrapper} `);
		expect(fileInputWrapperCls({ label: "test", merge: false }, true, true)).toBe(`  ${theme.invalidInputWrapper} ${theme.fileHover}`);
	});

	test("textareaCls", () => {
		expect(textareaCls({})).toBe(` ${theme.textarea}`);
		expect(textareaCls({ input: "test", merge: false })).toBe("test ");
	});

	test("radioInputCls", () => {
		expect(radioInputCls({}, false)).toBe(` ${theme.radio} ${theme.radioUnchecked} pointer`);
		expect(radioInputCls({ input: "test", merge: false }, true)).toBe(`test  ${theme.radioChecked} pointer`);
	});

	test("inputWrapper", () => {
		expect(inputWrapperCls({})).toBe(` ${theme.inputWrapper} `);
		expect(inputWrapperCls({}, true)).toBe(` ${theme.inputWrapper} ${theme.invalidInputWrapper}`);
		expect(inputWrapperCls({ inputWrapper: "test", merge: false })).toBe("test  ");
	});

	test("wrapperCls", () => {
		expect(wrapperCls({})).toBe(` ${theme.wrapper} `);
		expect(wrapperCls({ wrapper: "test", merge: false })).toBe("test  ");
	});

	test("fileHoverCls", () => {
		expect(fileHoverCls(false)).toBe("");
		expect(fileHoverCls(true)).toBe(theme.fileHover);
	});

});
