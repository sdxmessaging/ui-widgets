import m from "mithril";
import stream from "mithril/stream";

import { SelectInput } from "./select";

describe("SelectInput", () => {

	test("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("");
		m.mount(root, {
			view: () => m(SelectInput, {
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
		const value = stream<string>("val");
		m.mount(root, {
			view: () => m(SelectInput, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					uiClass: {},
					disabled: true,
					options: [{
						value: "val"
					}]
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
		expect(root.childNodes[0].childNodes.length).toBe(2);
	});

	test("readonly", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("");
		m.mount(root, {
			view: () => m(SelectInput, {
				field: {
					id: "test",
					readonly: true,
					options: [{
						value: "val",
						label: "Value"
					}]
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
		expect(root.childNodes[0].childNodes.length).toBe(1);
	});

});
