import m from "mithril";
import stream from "mithril/stream";

import { RadioInput } from "./radio";

describe("RadioInput", () => {

	test("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("");
		m.mount(root, {
			view: () => m(RadioInput, {
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
			view: () => m(RadioInput, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					uiClass: {},
					options: [{
						value: "val"
					}, {
						value: "val2",
						label: "val2",
						icon: "test"
					}]
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
		const input = root.getElementsByTagName('input');
		expect(input.length).toBe(2);
	});

});
