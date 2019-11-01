const o = require("ospec");

import m from "mithril";

import { SignStamp } from "./signStamp";
import { applyStamp } from "./signStamp";

o.spec("SignStamp", () => {

	o("create/remove", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(SignStamp, {
				onSet: () => null,
				onCancel: () => null
			})
		});
		o(root.childNodes.length).equals(1);
		m.mount(root, null);
		o(root.childNodes.length).equals(0);
	});

	o("apply", () => {
		const canvas = document.createElement("canvas");
		// Hardcode canvas size for test
		Object.defineProperties(canvas, {
			clientWidth: { get: () => 40 },
			clientHeight: { get: () => 10 }
		});
		applyStamp(canvas, false);
		const stampedUrl = canvas.toDataURL();
		applyStamp(canvas, true);
		o(stampedUrl === canvas.toDataURL()).equals(false);
	});

});
