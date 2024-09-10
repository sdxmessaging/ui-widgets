import m from 'mithril';
import stream from "mithril/stream";

import { LayoutType } from '../../interface/widget';
import { FloatLabel } from "./floatLabel";
import { FixedLabel } from "./fixedLabel";
import { TopLabel } from "./topLabel";

describe("floatLabel", () => {

	test("mount", () => {
		const root = window.document.createElement("div");
		const value = stream<string>();
		const xform = value.map((val) => val);
		const floatLabel = new FloatLabel();
		m.mount(root, {
			view: () => m(floatLabel, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					uiClass: { wrapper: "h2", input: "h2", inputWrapper: "h2" },
					required: true,
					instant: true,
					layout: LayoutType.floatAlways
				},
				value,
				xform,
				invalid: false,
				focus: false
			})
		});
		expect(root.childNodes.length).toEqual(1);
		const wrapper = root.firstElementChild as HTMLElement;
		expect(wrapper).toBeTruthy();
		const inputWrapper = wrapper.firstElementChild as HTMLElement;
		expect(inputWrapper).toBeTruthy();
		const legend = inputWrapper.firstElementChild as HTMLElement;
		expect(legend).not.toBeNull();
		expect(legend.className).toContain("mw-100");

		expect(floatLabel['labelTranslateY']()).not.toBe("-1ch");
	});

	test("fixedLabel", () => {
		const fixedLabel = new FixedLabel();
		expect(fixedLabel['shouldFloat']()).toBe(true);
	});

	test("topLabel", () => {
		const topLabel = new TopLabel();
		expect(topLabel['labelTranslateY']()).toBe("0.5ex");
	});
});
