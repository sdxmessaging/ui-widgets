const o = require("ospec");

import { TThemeUpdate } from "./interface/theme";
import { getIcon, updateTheme } from "./theme";

o.spec("Theme", () => {

	o("Default icon style", () => {
		o(getIcon("fa-test")).equals("fas fa-test");
	});

	o("Change icon style", () => {
		updateTheme({
			icon: "fal"
		});
		o(getIcon("fa-test")).equals("fal fa-test");
	});

	o("Unknown key", () => {
		// Do nothing
		updateTheme({
			unknown: "key"
		} as Partial<TThemeUpdate>);
	});

});
