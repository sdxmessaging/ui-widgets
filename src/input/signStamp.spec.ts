import m from "mithril";

import { SignStamp } from "./signStamp";
import { applyStamp } from "./signStamp";

describe("SignStamp", () => {

	test("create/remove", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(SignStamp, {
				heightPct: 25,
				style: {},
				onSet: () => null,
				onCancel: () => null
			})
		});
		expect(root.childNodes.length).toBe(2);
		// Force onupdate
		m.redraw.sync();
		m.mount(root, null);
		expect(root.childNodes.length).toBe(0);
	});

	test("apply", () => {
		const mockCallback = jest.fn();
		const apply = applyStamp(25, mockCallback);
		apply();
		expect(mockCallback.mock.calls.length).toBe(1);
	});

});
