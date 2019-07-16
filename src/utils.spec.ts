// TODO Compile ui-widgets with "module": "commonjs" before running test
// tslint:disable no-var-requires

// Browser mock
const window = require("mithril/test-utils/browserMock")();
interface ITestGlobal {
	window: Partial<Window>;
	document: Partial<Document>;
}
declare const global: ITestGlobal;
global.window = window;
global.document = window.document;

// Test suite
const o = require("ospec");
import {
	fileNameExtSplit,
	setIconStyle, styleIcon
} from "./utils";

o.spec("Utility functions", () => {

	o("Default icon style", () => {
		o(styleIcon("fa-test")).equals("fas fa-test");
	});

	o("Change icon style", () => {
		setIconStyle("fal");
		o(styleIcon("fa-test")).equals("fal fa-test");
	});

	o("File name handling", () => {
		o(fileNameExtSplit("test.complex.extension")).deepEquals(["test.complex", ".extension"]);
	});

});
