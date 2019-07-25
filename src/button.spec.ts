import "./mockBrowser";
// tslint:disable no-var-requires
const o = require("ospec");

import m from "mithril";

import { Button } from "./button";

o.spec("Button", () => {

	o("default + icon", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(Button, {
				label: "test",
				icon: "fa-times"
			})
		});
		o(root.childNodes.length).equals(1);
		const btn = root.childNodes[0] as HTMLButtonElement;
		o(btn.nodeName).equals("BUTTON");
		o(btn.getAttribute("type")).equals("button");
		// Icon and text nodes
		o(btn.childNodes.length).equals(2);
	});

	o("submit", () => {
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

	o("disabled", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(Button, {
				label: "test",
				disabled: true
			})
		});
		o(root.childNodes.length).equals(1);
		const btn = root.childNodes[0] as HTMLButtonElement;
		o(btn.nodeName).equals("BUTTON");
		o(btn.hasAttribute("disabled")).equals(true);
	});

});
