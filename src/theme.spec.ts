const o = require("ospec");

import { theme, updateClasses } from "./theme";
import { getButtonContext, updateButtonContext } from "./theme";

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
