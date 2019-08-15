const o = require("ospec");

import m from "mithril";

import { SignDraw } from "./signDraw";

o.spec("SignDraw", () => {

	o("create/remove", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(SignDraw, {
				onSet: () => null,
				onCancel: () => null
			})
		});
		o(root.childNodes.length).equals(2);
		m.mount(root, null);
		o(root.childNodes.length).equals(0);
	});

});
