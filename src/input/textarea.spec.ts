import m from "mithril";
import stream from "mithril/stream";

import { TextareaInput } from "./textarea";

describe("TextareaInput", () => {

	test("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("test");
		m.mount(root, {
			view: () => m(TextareaInput, {
				field: {
					id: "test"
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
		expect(root.childNodes[0].childNodes.length).toBe(1);
	});

	test("configured", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("test");
		m.mount(root, {
			view: () => m(TextareaInput, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					uiClass: {},
					required: true,
					instant: true
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
		// Label + Input
		expect(root.childNodes[0].childNodes.length).toBe(2);
	});

});
