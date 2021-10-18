import m from 'mithril';
import stream from "mithril/stream";

import { LayoutType } from '../../interface/widget';
import { FloatLabel } from "./floatLabel";


describe("floatLabel", () => {
	test('calcHeight', () => {
		const root = window.document.createElement("div");
		const value = stream<string>();
		// const xform = value.map((val) => val);
		const floatLabel = new FloatLabel();
		floatLabel['wrapperHeight'] = 12;
		m.mount(root, {
			view: () => m(floatLabel, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					uiClass: { wrapper: 'h2', input: "h2", inputWrapper: "h2" },
					required: true,
					instant: true,
					layout: LayoutType.floatLabel,
				},
				value
			})
		});
		expect(root.childNodes.length).toEqual(1);
		const inputWrapper = root.firstElementChild as HTMLElement;
		expect(inputWrapper).toBeTruthy();
		floatLabel['inputWrapper'] = inputWrapper;
		expect(floatLabel['wrapperHeight']).toEqual(12);
		floatLabel['calcHeight']();
		expect(floatLabel['wrapperHeight']).toEqual(0);

	});

	test('labelTranslateY', () => {
		const floatLabel = new FloatLabel();
		floatLabel['wrapperHeight'] = 12;
		const labelTranslateY = floatLabel['labelTranslateY']();
		expect(labelTranslateY).toEqual('calc(6px - 1.5ex)');
	});

	test('mount', () => {
		const root = window.document.createElement("div");
		const value = stream<string>();
		// const xform = value.map((val) => val);
		const floatLabel = new FloatLabel();
		floatLabel['wrapperHeight'] = 12;
		m.mount(root, {
			view: () => m(floatLabel, {
				field: {
					id: "test",
					label: "Test Label",
					name: "Test Name",
					title: "Test Title",
					uiClass: { wrapper: 'h2', input: "h2", inputWrapper: "h2" },
					required: true,
					instant: true,
					layout: LayoutType.floatAlways,
				},
				value
			})

		});
		expect(root.childNodes.length).toEqual(1);
		const wrapper = root.firstElementChild as HTMLElement;
		expect(wrapper).toBeTruthy();
		const inputWrapper = wrapper.firstElementChild as HTMLElement;
		expect(inputWrapper).toBeTruthy();
		floatLabel['inputWrapper'] = inputWrapper;
		expect(floatLabel['wrapperHeight']).toEqual(12);
		floatLabel['calcHeight']();
		expect(floatLabel['wrapperHeight']).toEqual(0);

		const legend = inputWrapper.firstElementChild as HTMLElement;
		expect(legend).not.toBeNull();

		expect(legend.style.maxWidth).toEqual('100%');
	});

	test('focusIn & focusOut', () => {
		const floatLabel = new FloatLabel();
		floatLabel['focusIn'](new Event('click'));
		expect(floatLabel['focus']).toEqual(true);
		floatLabel['focusOut'](new Event('click'));
		expect(floatLabel['focus']).toEqual(false);
	});
});
