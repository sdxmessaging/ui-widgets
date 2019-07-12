import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { getLabelText, inputText } from "../utils";

export class CheckboxInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label,
			id, name = id,
			required, readonly, disabled, autocomplete,
			containerClass, classes = ""
		} = field;
		return m("div", {
			class: containerClass
		}, m(".flex.flex-wrap", {
			class: inputText,
		},
			m("label.flex.items-center.dark-gray.pa2", {
				class: `${disabled ? "o-60 " : "pointer "}${classes}`
			},
				m("input.mr1[type=checkbox]", {
					id, name,
					checked: value(),
					required, readonly, disabled, autocomplete,
					// Update value on check
					onchange: ({ target: { checked } }: { target: HTMLInputElement }) => value(checked),
				}),
				getLabelText(label, required)
			)
		));
	}

}
