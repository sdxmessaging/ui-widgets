import m from "mithril";
import stream from "mithril/stream";

import { SelectText } from "./select";

describe("SelectText", () => {

	test("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("val");
		m.mount(root, {
			view: () => m(SelectText, {
				field: {
					id: "test"
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
		const content = root.childNodes[0];
		expect(content.childNodes.length).toBe(1);
		// Check value fallback
		expect((content.childNodes[0] as HTMLSpanElement).getAttribute("title")).toBe("val");
	});

	test("configured", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("val");
		m.mount(root, {
			view: () => m(SelectText, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					uiClass: {},
					options: [{
						value: "val",
						label: "label"
					}]
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
		const content = root.childNodes[0];
		expect(content.childNodes.length).toBe(2);
		// Check value is resolved
		expect((content.childNodes[1] as HTMLSpanElement).getAttribute("title")).toBe("label");
	});

	test("no label for value", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("val");
		m.mount(root, {
			view: () => m(SelectText, {
				field: {
					id: "test",
					options: [{
						value: "val"
					}]
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
		const content = root.childNodes[0];
		expect(content.childNodes.length).toBe(1);
		// Check value fallback
		expect((content.childNodes[0] as HTMLSpanElement).getAttribute("title")).toBe("val");
	});

});
