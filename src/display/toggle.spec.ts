import m from "mithril";
import stream from "mithril/stream";

import { Toggle } from "./toggle";

describe("Toggle", () => {

	test("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<boolean>(false);
		m.mount(root, {
			view: () => m(Toggle, {
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
			view: () => m(Toggle, {
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
