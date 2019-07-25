import "./mockBrowser";
// tslint:disable-next-line no-var-requires
const o = require("ospec");

import stream, { Stream } from "mithril/stream";
import { TProp } from "./interface/widget";

import {
	applyTheme,
	fileNameExtSplit,
	getIcon,
	guid,
	scaleRect,
	setCheck,
	setValue
} from "./utils";

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

o.spec("Input TProp update", () => {

	o("Update value", () => {
		const value: Stream<TProp> = stream<TProp>("Initial");
		const mod = setValue(value);
		const input = window.document.createElement("input");
		input.value = "Update";
		mod({ target: input });
		o(value()).equals(input.value);
	});

	o("Update check", () => {
		const check: Stream<TProp> = stream<TProp>(true);
		const mod = setCheck(check);
		const input = window.document.createElement("input");
		input.checked = false;
		mod({ target: input });
		o(check()).equals(input.checked);
	});

});

o.spec("Image scaling/rotation", () => {

	o("Scale rectangle", () => {
		const [scaleWidth, scaleHeight] = scaleRect(12, 6, 8);
		o(scaleWidth).equals(8);
		o(scaleHeight).equals(4);
	});

});
