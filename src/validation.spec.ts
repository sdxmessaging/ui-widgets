const o = require("ospec");

import { propInvalid, fileInvalid } from "./validation";

o.spec("propInvalid", () => {
	o("required", () => {
		o(propInvalid({
			id: "test",
		}, "")).equals(false);
		o(propInvalid({
			id: "test",
			required: true
		}, "")).equals(true);
	});
});

o.spec("fileInvalid", () => {

	o("required", () => {
		o(fileInvalid({
			id: "test",
		}, [])).equals(false);
		o(fileInvalid({
			id: "test",
			required: true
		}, [])).equals(true);
	});

});
