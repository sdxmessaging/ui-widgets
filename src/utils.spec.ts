import "./mockBrowser";
// tslint:disable-next-line no-var-requires
const o = require("ospec");

import {
	applyTheme,
	fileNameExtSplit,
	getIcon,
	guid,
	scaleRect
} from "./index";

o.spec("Utility functions", () => {

	o("Default icon style", () => {
		o(getIcon("fa-test")).equals("fas fa-test");
	});

	o("Change icon style", () => {
		applyTheme({
			icon: "fal"
		});
		o(getIcon("fa-test")).equals("fal fa-test");
	});

	o("Create unique ID", () => {
		o(guid().length).equals(36);
	});

	o("File name handling", () => {
		o(fileNameExtSplit("test.complex.extension")).deepEquals(["test.complex", ".extension"]);
	});

});

o.spec("Image scaling/rotation", () => {

	o("Scale rectangle", () => {
		const [scaleWidth, scaleHeight] = scaleRect(12, 6, 8);
		o(scaleWidth).equals(8);
		o(scaleHeight).equals(4);
	});

});
