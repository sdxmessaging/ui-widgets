import m from "mithril";

import { SelectionInner } from "./selectionInner";

describe("selectionInner", () => {

	test("basic", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(SelectionInner, {
				selected: false,
				label: "test",
				onIcon: "on-icon-class",
				offIcon: "off-icon-class",
				config: {
					selectionLayout: ["label", "icon", "on", "off"]
				}
			})
		});
		expect(root.childElementCount).toBe(1);
		expect(root.querySelector(".off-icon-class")).not.toBeNull();
	});

	test("basic + selected", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(SelectionInner, {
				selected: true,
				label: "test",
				onIcon: "on-icon-class",
				offIcon: "off-icon-class",
				config: {
					selectionLayout: ["label", "icon", "on", "off"]
				}
			})
		});
		expect(root.childElementCount).toBe(1);
		expect(root.querySelector(".on-icon-class")).not.toBeNull();
	});

});
