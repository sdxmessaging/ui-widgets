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
		o(root.childNodes.length).equals(1);
		// Force onupdate
		m.redraw.sync();
		m.mount(root, null);
		o(root.childNodes.length).equals(0);
	});

	o("apply", () => {
		const spy = o.spy(() => null);
		const apply = applyStamp(spy);
		apply();
		o(spy.callCount).equals(1);
	});

});
