const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { TProp } from "../interface/widget";

import { Trusted } from "./trusted";

o.spec("Trusted", () => {

	o("text", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("<h1>Title</h1><p>Content</p>");
		m.mount(root, {
			view: () => m(Trusted, {
				field: {
					id: "test"
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
		const content = root.childNodes[0].childNodes;
		// 2 trusted elements
		o(content.length).equals(2);
	});

});
