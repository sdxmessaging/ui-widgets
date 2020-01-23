import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IOptionField, IPropWidget } from "../interface/widget";

import { actCls, classMap, getIcon, txtCls } from "../theme";
import { getLabel, setValue } from "../utils";

export class RadioInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value: val } }: CVnode<IPropWidget>) {
		const {
			id, name = id,
			required, readonly, disabled, autocomplete,
			containerClass = "flex-wrap", classes = "",
			options
		} = field as IOptionField;
		return [
			getLabel(field),
			m(".flex", {
				class: `${txtCls()} ${containerClass}`,
				onchange: setValue(val)
			}, lodash.map(options, ({ value, label, icon }) => {
				const checked = val() === value;
				// No requirement for label "for" attribute
				return m("label.flex.items-center", {
					title: label,
					class: `${disabled ? "o-60" : readonly ? "" : "pointer"} ${checked ? actCls() : "dim pointer"} ${classMap.btnBrd()} ${classes}`
				},
					m("input.clip[type=radio]", {
						name, value, checked,
						required, autocomplete,
						disabled: disabled || readonly,
					}),
					icon ? m("i.fa-fw", {
						title: label,
						class: getIcon(icon)
					}) : label
				);
			}))
		];
	}

}
