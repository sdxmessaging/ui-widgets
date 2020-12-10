const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { TProp } from "../interface/widget";

import { DateInput } from "./dateInput";

o.spec("DateInput", () => {

	o("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<TProp>();
		m.mount(root, {
			view: () => m(DateInput, {
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
		const value = stream<TProp>();
		const xform = value.map((val) => val);
		m.mount(root, {
			view: () => m(DateInput, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					classes: "test",
					disabled: true,
					options: [{ value: "en-US" }]
				},
				value,
				xform
			})
		});
		o(root.childNodes.length).equals(1);
		// Label + Input
		o(root.childNodes[0].childNodes.length).equals(2);
		// Set valid date
		value("2020-01-01");
		// Set invalid date
		value("2020-01-32");
		// Get day input and update value
		const dateIn = root.querySelector("#test-dd") as HTMLInputElement;
		o(dateIn != null).equals(true);
		dateIn.value = "02";
		dateIn.dispatchEvent(new Event("change"));
		// Verify change
		o(value()).equals("2020-01-02");
		// Cleanup
		m.mount(root, null);
	});

});
