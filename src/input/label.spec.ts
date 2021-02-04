import m from "mithril";
import stream from "mithril/stream";

import { Label } from "./label";

describe("Label", () => {

	test("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<boolean>(true);
		m.mount(root, {
			view: () => m(Label, {
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
			view: () => m(Label, {
				field: {
					id: "test",
					label: "Test Label",
					title: "Test Title",
					required: true
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
	});

});
