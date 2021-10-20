import m from "mithril";

import { NavLink } from "./navLink";

describe("NavLink", () => {

	test("minimal label", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(NavLink, {
				label: "Test Label"
			})
		});
		expect(root.childNodes.length).toBe(1);
		const link = root.childNodes[0] as HTMLLinkElement;
		expect(link.nodeName).toBe("A");
		// Text only
		expect(link.childNodes.length).toBe(1);
	});

	test("minimal icon", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(NavLink, {
				icon: "test"
			})
		});
		expect(root.childNodes.length).toBe(1);
		const link = root.childNodes[0] as HTMLLinkElement;
		expect(link.nodeName).toBe("A");
		// Icon only
		expect(link.childNodes.length).toBe(1);
	});

	test("configured", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(NavLink, {
				label: "test",
				title: "Test Title",
				icon: "test",
				rightIcon: "test",
				href: "test",
				rel: "test",
				target: "_blank",
				download: "test",
				classes: "test",
			})
		});
		expect(root.childNodes.length).toBe(1);
		const link = root.childNodes[0] as HTMLLinkElement;
		expect(link.nodeName).toBe("A");
		expect(link.getAttribute("target")).toBe("_blank");
		// Icon + Text + right Icon
		expect(link.childNodes.length).toBe(3);
	});

});
