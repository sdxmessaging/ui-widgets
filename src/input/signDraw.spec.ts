const o = require("ospec");

import m from "mithril";

import { config } from "../config";

import { SignDraw } from "./signDraw";

o.spec("SignDraw", () => {

	o("create/remove", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(SignDraw, {
				heightPct: 25,
				style: {},
				onSet: () => null,
				onCancel: () => null
			})
		});
		o(root.childNodes.length).equals(2);
		// Test signature buttons
		const applyBtn = root.querySelector(`[title=${config.applyTtl}]`);
		o(applyBtn != null).equals(true);
		if (applyBtn) {
			applyBtn.dispatchEvent(new Event("click"));
		}
		const resetBtn = root.querySelector(`[title=${config.resetTtl}]`);
		o(resetBtn != null).equals(true);
		if (resetBtn) {
			resetBtn.dispatchEvent(new Event("click"));
		}
		const cancelBtn = root.querySelector(`[title=${config.cancelTtl}]`);
		o(cancelBtn != null).equals(true);
		if (cancelBtn) {
			cancelBtn.dispatchEvent(new Event("click"));
		}
		m.mount(root, null);
		o(root.childNodes.length).equals(0);
	});

});
