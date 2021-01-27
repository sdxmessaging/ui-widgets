const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { CardDateInput } from "./cardDateInput";

o.spec("CardDateInput", () => {

	o("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<string>();
		m.mount(root, {
			view: () => m(CardDateInput, {
				field: {
					id: "test"
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
		// Input only
		o(root.childNodes[0].childNodes.length).equals(1);
		// Cleanup
		m.mount(root, null);
	});

	o("configured + value change", () => {
		const root = window.document.createElement("div");
		const value = stream<string>();
		const xform = value.map((val) => val);
		m.mount(root, {
			view: () => m(CardDateInput, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					uiClass: {},
					disabled: true
				},
				value,
				xform
			})
		});
		o(root.childNodes.length).equals(1);
		// Label + Input
		o(root.childNodes[0].childNodes.length).equals(2);
		// Set empty date
		value("");
		// Set partial date
		value("01");
		// Set valid date
		value("01/20");
		// Get month input and update value
		const dateIn = root.querySelector("#test-mm") as HTMLInputElement;
		o(dateIn != null).equals(true);
		dateIn.value = "02";
		dateIn.dispatchEvent(new Event("change"));
		// Verify change
		o(value()).equals("02/20");
		// Cleanup
		m.mount(root, null);
	});

});
