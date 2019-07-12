import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IOptionField, IPropWidget } from "../interface/widget";

import { getLabel, inputText } from "../utils";

export class RadioInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value: val } }: CVnode<IPropWidget>) {
		const {
			id, name = id,
			required, readonly, disabled, autocomplete,
			containerClass, classes = "",
			options
		} = field as IOptionField;
		return [
			getLabel(field),
			m("div", {
				class: containerClass
			}, m(".flex.flex-wrap", {
				class: inputText,
				onchange: ({ target: { value } }: { target: HTMLInputElement }) => val(value)
			},
				// No requirement for label "for" attribute
				lodash.map(options, ({ label, value }) => m("label.flex.items-center", {
					class: `${disabled ? "o-60 " : "pointer "}${classes}`
				},
					m("input.mr1[type=radio]", {
						name,
						value,
						checked: val() === value,
						required, readonly, disabled, autocomplete
					}),
					label
				))
			))
		];
	}

}
