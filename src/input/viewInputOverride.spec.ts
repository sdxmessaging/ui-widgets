import m from "mithril";
import stream from "mithril/stream";
import { IPropWidget } from "..";
import { ViewInputOverride } from './viewInputOverride';



describe("use ViewInputOverride", () => {
	const value = stream('test')

	test("renders children input", () => {
		const testString = 'foo';
		const attrs: IPropWidget = {
			field: {
				id: "some_id",
				label: "Test Label",
				name: "Test Name",
				title: "Test Title",
				uiClass: {},
				disabled: true
			},
			value,
			children: m('input', testString),
		};
		const root = window.document.createElement("div") as HTMLElement;
		m.mount(root, {
			view: () => m(ViewInputOverride, attrs)
		});
		expect(root.childNodes.length).toBe(1);
		const input = root.getElementsByTagName('input');
		expect(input[0].innerHTML).toBe(testString);

	});

});
