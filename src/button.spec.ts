const o = require("ospec");

import m from "mithril";

import { Button } from "./button";

o.spec("Button", () => {

	o("default + right icon", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(Button, {
				label: "test",
				rightIcon: "fa-times"
			})
		});
		o(root.childNodes.length).equals(1);
		const btn = root.childNodes[0] as HTMLButtonElement;
		o(btn.nodeName).equals("BUTTON");
		o(btn.getAttribute("type")).equals("button");
		// Icon and text nodes
		o(btn.childNodes.length).equals(2);
	});

	o("submit + no icon", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(Button, {
				label: "test",
				type: "submit"
			})
		});
		o(root.childNodes.length).equals(1);
		const btn = root.childNodes[0] as HTMLButtonElement;
		o(btn.nodeName).equals("BUTTON");
		o(btn.getAttribute("type")).equals("submit");
		// Text node only
		o(btn.childNodes.length).equals(1);
	});

	o("disabled + icon + right icon", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(Button, {
				icon: "test",
				rightIcon: "test",
				disabled: true
			})
		});
		o(root.childNodes.length).equals(1);
		const btn = root.childNodes[0] as HTMLButtonElement;
		o(btn.nodeName).equals("BUTTON");
		o(btn.hasAttribute("disabled")).equals(true);
	});

});
