import m from "mithril";

import { NavButton } from "./navButton";

describe("NavButton", () => {

	test("icon only", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(NavButton, {
				icon: "icon"
			})
		});
		expect(root.childNodes.length).toBe(1);
		const btn = root.childNodes[0] as HTMLDivElement;
		expect(btn.childNodes.length).toBe(2);
	});

	test("label only", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(NavButton, {
				label: "Label",
				title: "Title",
				classes: "custom",
				onclick: () => null
			})
		});
		expect(root.childNodes.length).toBe(1);
	});

	test("disabled + icons", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(NavButton, {
				label: "Disabled",
				icon: "icon",
				rightIcon: "icon",
				disabled: true
			})
		});
		expect(root.childNodes.length).toBe(1);
		const btn = root.childNodes[0] as HTMLDivElement;
		// Icon + text + right icon
		expect(btn.childNodes.length).toBe(3);
	});

});
