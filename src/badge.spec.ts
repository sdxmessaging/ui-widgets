const o = require("ospec");

import m from "mithril";

import { Badge } from "./badge";

o.spec("Badge", () => {

	o("default + no label", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(Badge, {})
		});
		o(root.childNodes.length).equals(1);
	});

	o("class + label", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(Badge, {
				label: "test",
				classes: "bg-yellow"
			},
				m("span", "Badge content")
			)
		});
		o(root.childNodes.length).equals(1);
	});

});
