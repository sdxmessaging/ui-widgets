import m from "mithril";

import { Button } from "./button";

describe("Button", () => {

	test("default + right icon", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(Button, {
				label: "test",
				rightIcon: "fa-times"
			})
		});
		expect(root.childNodes.length).toBe(1);
		const btn = root.childNodes[0] as HTMLButtonElement;
		expect(btn.nodeName).toBe("BUTTON");
		expect(btn.getAttribute("type")).toBe("button");
		// Icon and text nodes
		expect(btn.childNodes.length).toBe(2);
	});

	test("submit + no icon", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(Button, {
				label: "test",
				type: "submit"
			})
		});
		expect(root.childNodes.length).toBe(1);
		const btn = root.childNodes[0] as HTMLButtonElement;
		expect(btn.nodeName).toBe("BUTTON");
		expect(btn.getAttribute("type")).toBe("submit");
		// Text node only
		expect(btn.childNodes.length).toBe(1);
	});

	test("disabled + icon + right icon", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(Button, {
				icon: "test",
				rightIcon: "test",
				disabled: true
			})
		});
		expect(root.childNodes.length).toBe(1);
		const btn = root.childNodes[0] as HTMLButtonElement;
		expect(btn.nodeName).toBe("BUTTON");
		expect(btn.hasAttribute("disabled")).toBe(true);
	});

});
