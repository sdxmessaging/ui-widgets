const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { config } from "../config";

import { SignType } from "./signType";
import { applyText } from "./signType";

o.spec("SignType", () => {

	o("create/remove", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(SignType, {
				heightPct: 25,
				style: {},
				onSet: () => null,
				onCancel: () => null
			})
		});
		o(root.childNodes.length).equals(2);
		// Test reset button
		const resetBtn = root.querySelector(`[title=${config.resetTtl}]`);
		o(resetBtn != null).equals(true);
		if (resetBtn) {
			resetBtn.dispatchEvent(new Event("click"));
		}
		// Force onupdate
		m.redraw.sync();
		m.mount(root, null);
		o(root.childNodes.length).equals(0);
	});

	o("apply", () => {
		const text: stream<string> = stream<string>("");
		const spy = o.spy(() => null);
		const apply = applyText(text, 25, spy);
		// Spy should not be called with empty text
		apply();
		o(spy.callCount).equals(0);
		text("test");
		apply();
		o(spy.callCount).equals(1);
		// spy.args[0] will be a base64 encoded png of text on a canvas
	});

});
