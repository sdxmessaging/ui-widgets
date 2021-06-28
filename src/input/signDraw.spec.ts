import m from "mithril";

import { config } from "../config";

import { SignDraw } from "./signDraw";

describe("SignDraw", () => {

	test("create/remove", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(SignDraw, {
				heightPct: 25,
				stampTxt: "",
				stampSetTxt: "",
				style: {},
				onSet: () => null,
				onCancel: () => null
			})
		});
		expect(root.childNodes.length).toBe(2);
		// Test signature buttons
		const applyBtn = root.querySelector(`[title=${config.applyTtl}]`) as HTMLElement;
		expect(applyBtn).not.toBeNull();
		applyBtn.dispatchEvent(new Event("click"));
		// Reset canvas
		const resetBtn = root.querySelector(`[title=${config.resetTtl}]`) as HTMLElement;
		expect(resetBtn).not.toBeNull();
		resetBtn.dispatchEvent(new Event("click"));
		// Cancel creation
		const cancelBtn = root.querySelector(`[title=${config.cancelTtl}]`) as HTMLElement;
		expect(cancelBtn).not.toBeNull();
		cancelBtn.dispatchEvent(new Event("click"));
		m.mount(root, null);
		expect(root.childNodes.length).toBe(0);
	});

});
