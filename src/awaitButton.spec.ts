import m from "mithril";

import { AwaitButton } from "./awaitButton";

describe("AwaitButton", () => {

	test("disabled state", (done) => {
		const root = window.document.createElement("div");

		const awaitPromise = new Promise<void>((resolve) => resolve());

		m.mount(root, {
			view: () => m(AwaitButton, {
				label: "test",
				rightIcon: "fa-times",
				onclick: () => awaitPromise
			})
		});
		expect(root.childNodes.length).toBe(1);
		const btn = root.childNodes[0] as HTMLButtonElement;
		expect(btn.disabled).toBe(false);

		// Click and confirm button disabled
		btn.dispatchEvent(new Event("click"));
		m.redraw.sync();
		expect(btn.disabled).toBe(true);

		// Confirm button enabled again
		awaitPromise.finally(() => {
			m.redraw.sync();
			expect(btn.disabled).toBe(false);
			done();
		});
	});

});
