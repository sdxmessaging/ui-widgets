import "../mockBrowser";
// tslint:disable no-var-requires
const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { Label } from "../index";
import { FieldType, TProp } from "../interface/widget";

o.spec("Label", () => {

	o("value", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>(true);
		m.mount(root, {
			view: () => m(Label, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.label
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

});
