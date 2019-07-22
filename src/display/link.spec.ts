import "../mockBrowser";
// tslint:disable no-var-requires
const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { Link } from "../index";
import { FieldType, TProp } from "../interface/widget";

o.spec("Link", () => {

	o("url", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("www.example.com");
		m.mount(root, {
			view: () => m(Link, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.text
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

	o("email", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("test@example.com");
		m.mount(root, {
			view: () => m(Link, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.email
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

	o("tel", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>("+1-541-754-3010");
		m.mount(root, {
			view: () => m(Link, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.tel
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

});
