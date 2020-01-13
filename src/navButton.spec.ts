const o = require("ospec");

import m from "mithril";

import { NavButton } from "./navButton";

o.spec("NavButton", () => {

	o("icon only", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(NavButton, {
				icon: "icon"
			})
		});
		o(root.childNodes.length).equals(1);
		const btn = root.childNodes[0] as HTMLDivElement;
		o(btn.childNodes.length).equals(1);
	});

	o("label only", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(NavButton, {
				label: "Label",
				title: "Title",
				classes: "custom",
				style: {},
				onclick: () => null
			})
		});
		o(root.childNodes.length).equals(1);
	});

	o("disabled", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(NavButton, {
				label: "Disabled",
				icon: "icon",
				disabled: true
			})
		});
		o(root.childNodes.length).equals(1);
		const btn = root.childNodes[0] as HTMLDivElement;
		// Icon and text nodes
		o(btn.childNodes.length).equals(2);
	});

});
