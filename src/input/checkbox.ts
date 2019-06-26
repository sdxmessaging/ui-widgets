import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { getLabelText, inputText } from "../utils";

export class CheckboxInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { id, label, classes, containerClass, required, disabled } = field;
		return m("div", {
			class: containerClass
		}, m(".flex.flex-wrap.pa2", {
			class: inputText,
		},
			m("label.flex.items-center.dark-gray", {
				class: `${disabled ? "o-60 " : ""}${classes}`
			},
				m("input.mr1[type=checkbox]", {
					id,
					name: id,
					checked: value(),
					required,
					disabled,
					// Update value on check
					onchange: ({ target: { checked } }: { target: HTMLInputElement }) => value(checked),
				}),
				getLabelText(label, required)
			)
		));
	}

}
