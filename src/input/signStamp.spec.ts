const o = require("ospec");

import m from "mithril";

import { SignStamp } from "./signStamp";
import { applyStamp } from "./signStamp";

o.spec("SignStamp", () => {

	o("create/remove", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(SignStamp, {
				onSet: () => null,
				onCancel: () => null
			})
		});
		o(root.childNodes.length).equals(2);
		m.mount(root, null);
		o(root.childNodes.length).equals(0);
	});

	o("apply", () => {
		const spy = o.spy(() => null);
		const apply = applyStamp(spy);
		// Spy should not be called with empty text
		apply();
		o(spy.callCount).equals(1);
		// spy.args[0] will be a base64 encoded png of text on a canvas
	});

});
