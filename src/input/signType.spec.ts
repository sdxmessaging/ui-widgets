const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { SignType } from "./signType";
import { applyText } from "./signType";

o.spec("SignType", () => {

	o("create/remove", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(SignType, {
				onSet: () => null,
				onCancel: () => null
			})
		});
		o(root.childNodes.length).equals(2);
		m.mount(root, null);
		o(root.childNodes.length).equals(0);
	});

	o("apply", () => {
		const text: stream<string> = stream<string>("");
		const spy = o.spy(() => null);
		const apply = applyText(text, spy);
		// Spy should not be called with empty text
		apply();
		o(spy.callCount).equals(0);
		text("test");
		apply();
		o(spy.callCount).equals(1);
		// spy.args[0] will be a base64 encoded png of text on a canvas
	});

});
