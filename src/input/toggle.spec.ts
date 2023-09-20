import m from "mithril";
import stream from "mithril/stream";

import { ToggleInput } from "./toggle";
import { LayoutType } from "../interface/widget";

describe("ToggleInput", () => {

	test("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<boolean>(false);
		m.mount(root, {
			view: () => m(ToggleInput, {
				field: {
					id: "test"
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
	});

	test("configured", () => {
		const root = window.document.createElement("div");
		const value = stream<boolean>(true);
		m.mount(root, {
			view: () => m(ToggleInput, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					disabled: true,
					uiClass: {},
					layout: LayoutType.floatAlways
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
	});

});
