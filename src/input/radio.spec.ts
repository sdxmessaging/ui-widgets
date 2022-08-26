import m from "mithril";
import stream from "mithril/stream";

import { RadioInput } from "./radio";

describe("RadioInput", () => {

	test("render", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("");
		m.mount(root, {
			view: () => m("div",
				m(RadioInput, {
					field: {
						id: "radio-in",
						label: "Yes",
						name: "radio-group-1",
						value: "yes",
						required: true
					},
					value
				}),
				m(RadioInput, {
					field: {
						id: "radio-in2",
						label: "No",
						name: "radio-group-1",
						value: "no",
						required: true
					},
					value
				})
			)
		});
		expect(root.childNodes.length).toBe(1);
		expect(root.childNodes[0].childNodes.length).toBe(2);
	});

	test("checked", () => {
		const root = window.document.createElement("div");
		const value = stream<string>();
		m.mount(root, {
			view: () => m("div", [
				m(RadioInput, {
					field: {
						id: "radio-in",
						label: "Yes",
						name: "radio-group-1",
						value: "yes",
						required: true
					},
					value
				}),
				m(RadioInput, {
					field: {
						id: "radio-in2",
						label: "No",
						name: "radio-group-1",
						value: "no",
						required: true
					},
					value
				})
			])
		});
		const radio2 = root.querySelector("#radio-in2") as HTMLInputElement;
		expect(radio2).toBeTruthy();
		expect(radio2.checked).not.toBeTruthy();
		value("no");
		m.redraw.sync();
		expect(radio2.checked).toBeTruthy();
	});

});
