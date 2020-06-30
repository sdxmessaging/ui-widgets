const o = require("ospec");

import m from "mithril";

import { ButtonLink } from "./buttonLink";

o.spec("ButtonLink", () => {

	o("minimal label", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(ButtonLink, {
				label: "Test Label"
			})
		});
		o(root.childNodes.length).equals(1);
		const link = root.childNodes[0] as HTMLLinkElement;
		o(link.nodeName).equals("A");
		// Text only
		o(link.childNodes.length).equals(1);
	});

	o("minimal icon", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(ButtonLink, {
				icon: "test"
			})
		});
		o(root.childNodes.length).equals(1);
		const link = root.childNodes[0] as HTMLLinkElement;
		o(link.nodeName).equals("A");
		// Icon only
		o(link.childNodes.length).equals(1);
	});

	o("configured", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(ButtonLink, {
				label: "test",
				title: "Test Title",
				rightIcon: "test",
				href: "test",
				rel: "test",
				target: "_blank",
				download: "test",
				classes: "test",
				style: { test: "value" }
			})
		});
		o(root.childNodes.length).equals(1);
		const link = root.childNodes[0] as HTMLLinkElement;
		o(link.nodeName).equals("A");
		o(link.getAttribute("target")).equals("_blank");
		// Icon + Text
		o(link.childNodes.length).equals(2);
	});

});
