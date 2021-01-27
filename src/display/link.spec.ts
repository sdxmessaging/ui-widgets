const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType } from "../interface/widget";

import { Link } from "./link";

o.spec("Link", () => {

	o("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("www.example.com");
		m.mount(root, {
			view: () => m(Link, {
				field: {
					id: "test"
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

	o("email", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("test@example.com");
		m.mount(root, {
			view: () => m(Link, {
				field: {
					id: "test",
					type: FieldType.email
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

	o("configured tel", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("+1-541-754-3010");
		m.mount(root, {
			view: () => m(Link, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					type: FieldType.tel,
					uiClass: {}
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
	});

});
