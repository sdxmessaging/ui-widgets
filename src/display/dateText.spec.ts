import m from "mithril";
import stream from "mithril/stream";

import { DateText } from "./dateText";

describe("DateText", () => {

	test("empty", () => {
		const root = window.document.createElement("div");
		const value = stream<string>();
		m.mount(root, {
			view: () => m(DateText, {
				field: {
					id: "test",
				},
				value
			})
		});
		// Container element (Label + Input children)
		expect(root.childNodes.length).toBe(1);
		// Cleanup
		m.mount(root, null);
	});

	test("date value", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("2020-01-01");
		m.mount(root, {
			view: () => m(DateText, {
				field: {
					id: "test",
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
		// Set empty value
		value("");
	});

});
