import m from "mithril";
import stream from "mithril/stream";

import { FieldType } from "../interface/widget";

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
					uiClass: {},
					disabled: true,
					instant: true
				},
				value,
				xform
			})
		});
		expect(root.childNodes.length).toBe(1);
		// Label + Input
		expect(root.childNodes[0].childNodes.length).toBe(2);
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

	test("baseinputInteralLabel configured", () => {
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
					uiClass: {},
					disabled: true,
					instant: true
				},
				floatLabel: true,
				value,
				xform
			})
		});
		expect(root.childNodes.length).toBe(1);
		const input = root.querySelector('input');
		expect(input).not.toBeNull();
		const legend = root.querySelector('legend') as HTMLElement;
		expect(legend).not.toBeNull();
		expect(legend.textContent).toBe('Test Label');
		const label = root.querySelector('label') as HTMLElement;
		expect(label).not.toBeNull();
		expect(label.textContent).toBe('Test Label');
	});

});
