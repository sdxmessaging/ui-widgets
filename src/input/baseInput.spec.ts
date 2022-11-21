import m from "mithril";
import stream from "mithril/stream";

import { FieldType, LayoutType } from "../interface/widget";

import { BaseInput } from "./baseInput";

describe("BaseInput", () => {

	test("minimal", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("test");
		m.mount(root, {
			view: () => m(BaseInput, {
				field: {
					id: "test"
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
		// Input only
		expect(root.childNodes[0].childNodes.length).toBe(1);
		// Unmount
		m.mount(root, null);
	});

	test("configured", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("test");
		const xform = value.map((val) => val);
		m.mount(root, {
			view: () => m(BaseInput, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					type: FieldType.number,
					disabled: true,
					layout: LayoutType.default,
					instant: true,
					uiClass: {}
				},
				value,
				xform
			})
		});
		expect(root.childNodes.length).toBe(1);
		// Label + Input
		expect(root.childNodes[0].childNodes.length).toBe(2);
	});

	test("configured + validation + rich label", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("");
		const xform = value.map((val) => val);
		m.mount(root, {
			view: () => m(BaseInput, {
				field: {
					id: "test",
					label: {
						text: "Test Label",
						alt: "Alt Label"
					},
					required: true,
					type: FieldType.date,
					uiClass: {}
				},
				value,
				xform
			})
		});
		expect(root.childNodes.length).toBe(1);
	});

	test("hidden", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("test");
		m.mount(root, {
			view: () => m(BaseInput, {
				field: {
					id: "test",
					type: FieldType.hidden
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
		expect(root.firstElementChild?.classList.contains("clip")).toBe(true);
	});

});
