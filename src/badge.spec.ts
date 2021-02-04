import m from "mithril";

import { Badge } from "./badge";

describe("Badge", () => {

	test("default + no label", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(Badge, {})
		});
		expect(root.children.length).toBe(1);
	});

	test("class + label", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(Badge, {
				label: "test",
				classes: "bg-yellow"
			},
				m("span", "Badge content")
			)
		});
		expect(root.childNodes.length).toBe(1);
	});

});
