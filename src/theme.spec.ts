const o = require("ospec");

import { theme, updateClasses } from "./theme";
import { getButtonContext, updateButtonContext } from "./theme";
import {
	labelCls,
	inputCls, fileInputCls, textareaCls, radioInputCls,
	inputWrapperCls, wrapperCls
} from "./theme";

o.spec("Theme", () => {

	o("Update", () => {
		updateClasses({
			label: "test"
		});
		o(theme.label).equals("test");
	});

});

o.spec("Button Context", () => {

	o("Default", () => {
		o(getButtonContext()).equals("bg-light-blue dark-gray");
	});

	o("Unknown", () => {
		o(getButtonContext("unknown")).equals("");
	});

	o("Set", () => {
		const testVal = "test";
		updateButtonContext({ "test": testVal });
		o(getButtonContext("test")).equals(testVal);
	});

	o("Update", () => {
		const testVal = "modified";
		updateButtonContext({ "test": testVal });
		o(getButtonContext("test")).equals(testVal);
	});

});

o.spec("Theme Classes", () => {

	o("labelCls", () => {
		o(labelCls({})).equals(` ${theme.label}`);
		o(labelCls({ label: "test", merge: false })).equals("test");
	});

	o("inputCls", () => {
		o(inputCls({})).equals(` pointer ${theme.input}`);
		o(inputCls({ input: "test", merge: false })).equals("test pointer ");
	});

	o("fileInputCls", () => {
		o(fileInputCls(false)).equals(`${theme.fileInput} `);
		o(fileInputCls(true)).equals(`${theme.fileInput} ${theme.fileHover}`);
	});

	o("textareaCls", () => {
		o(textareaCls({})).equals(` pointer ${theme.textarea}`);
		o(textareaCls({ input: "test", merge: false })).equals("test pointer ");
	});

	o("radioInputCls", () => {
		o(radioInputCls({}, false)).equals(` pointer ${theme.radioUnchecked} ${theme.radio}`);
		o(radioInputCls({ input: "test", merge: false }, true)).equals(`test pointer ${theme.radioChecked} `);
	});

	o("inputWrapper", () => {
		o(inputWrapperCls({})).equals(` ${theme.inputWrapper}`);
		o(inputWrapperCls({ inputWrapper: "test", merge: false })).equals("test");
	});

	o("wrapperCls", () => {
		o(wrapperCls({})).equals(` ${theme.wrapper}`);
		o(wrapperCls({ wrapper: "test", merge: false })).equals("test");
	});

});
