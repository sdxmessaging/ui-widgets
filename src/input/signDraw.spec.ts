import m from "mithril";

import { config } from "../config";

import { SignDraw } from "./signDraw";

describe("SignDraw", () => {

	test("create/remove", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(SignDraw, {
				heightPct: 25,
				style: {},
				onSet: () => null,
				onCancel: () => null
			})
		});
		expect(root.childNodes.length).toBe(2);
		// Test signature buttons
		const applyBtn = root.querySelector(`[title=${config.applyTtl}]`);
		expect(applyBtn != null).toBe(true);
		if (applyBtn) {
			applyBtn.dispatchEvent(new Event("click"));
		}
		const resetBtn = root.querySelector(`[title=${config.resetTtl}]`);
		expect(resetBtn != null).toBe(true);
		if (resetBtn) {
			resetBtn.dispatchEvent(new Event("click"));
		}
		const cancelBtn = root.querySelector(`[title=${config.cancelTtl}]`);
		expect(cancelBtn != null).toBe(true);
		if (cancelBtn) {
			cancelBtn.dispatchEvent(new Event("click"));
		}
		m.mount(root, null);
		expect(root.childNodes.length).toBe(0);
	});

});
