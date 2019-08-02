// tslint:disable no-var-requires
const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, TProp } from "../interface/widget";

import { BaseText } from "./baseText";

o.spec("BaseText", () => {

	o("text", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("test");
		m.mount(root, {
			view: () => m(BaseText, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.text
				},
				value
			})
		});
		// Container element (Label + Input children)
		o(root.childNodes.length).equals(1);
	});

});
