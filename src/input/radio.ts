import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IOptionField, IPropWidget } from "../interface/widget";

import { getLabel, inputText } from "../utils";

export class RadioInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value: val } }: CVnode<IPropWidget>) {
		const radioField = field as IOptionField;
		const { prop, options, classes, containerClass, disabled } = radioField;
		return [
			getLabel(radioField),
			m("div", {
				class: containerClass
			}, m(".flex.flex-wrap", {
				class: inputText,
				onchange: ({ target: { value } }: { target: HTMLInputElement }) => val(value)
			},
				lodash.map(options, ({ label, value }) => m("label.flex.items-center.ma2", {
					class: disabled ? "o-60" : "pointer"
				},
					m("input.mr1[type=radio]", {
						name: prop,
						value: value,
						checked: val() === value,
						class: classes,
						disabled
					}),
					label
				))
			))
		];
	}

}
