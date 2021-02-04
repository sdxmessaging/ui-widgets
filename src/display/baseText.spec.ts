import m from "mithril";
import stream from "mithril/stream";

import { BaseText } from "./baseText";

describe("BaseText", () => {

	test("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("test");
		m.mount(root, {
			view: () => m(BaseText, {
				field: {
					id: "test",
				},
				value
			})
		});
		// Container element (Label + Input children)
		expect(root.childNodes.length).toBe(1);
	});

	test("configured", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("test");
		m.mount(root, {
			view: () => m(BaseText, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					uiClass: {}
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
	});

});
