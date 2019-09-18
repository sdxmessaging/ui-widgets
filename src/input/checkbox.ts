import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { txtCls } from "../theme";
import { getLabelText, setCheck } from "../utils";

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
			class: txtCls(),
		},
			m("label.flex.items-center.dark-gray", {
				class: `${disabled ? "o-60" : readonly ? "" : "pointer"} ${classes}`
			},
				m("input.mr1[type=checkbox]", {
					id, name,
					checked: value(),
					required, autocomplete,
					disabled: disabled || readonly,
					// Update value on check
					onchange: setCheck(value),
				}),
				getLabelText(label, required)
			)
		));
	}

}
