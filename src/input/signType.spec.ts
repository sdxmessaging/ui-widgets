import m from "mithril";
import stream from "mithril/stream";

import { config } from "../config";

import { SignType } from "./signType";
import { applyText } from "./signType";

describe("SignType", () => {

	test("create/remove", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(SignType, {
				heightPct: 25,
				stampTxt: "",
				stampSetTxt: "",
				style: {},
				onSet: () => null,
				onCancel: () => null
			})
		});
		expect(root.childNodes.length).toBe(2);
		// Test reset button
		const resetBtn = root.querySelector(`[title=${config.resetTtl}]`);
		expect(resetBtn != null).toBe(true);
		if (resetBtn) {
			resetBtn.dispatchEvent(new Event("click"));
		}
		// Force onupdate
		m.redraw.sync();
		m.mount(root, null);
		expect(root.childNodes.length).toBe(0);
	});

	test("apply", () => {
		const text: stream<string> = stream<string>("");
		const mockCallback = jest.fn();
		const apply = applyText(text, 25, mockCallback);
		// mockCallback should not be called with empty text
		apply();
		expect(mockCallback.mock.calls.length).toBe(0);
		text("test");
		apply();
		expect(mockCallback.mock.calls.length).toBe(1);
	});

});
