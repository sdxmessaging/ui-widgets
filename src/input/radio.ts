import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IOptionField, IPropWidget } from "../interface/widget";

import { actCls, classMap, getIcon, txtCls } from "../theme";
import { getEnabledClass, getLabel, setValue } from "../utils";

export class RadioInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value: val } }: CVnode<IPropWidget>) {
		const {
			label: lbl, id, name = id,
			required, readonly, disabled, autocomplete,
			containerClass = "flex-wrap", classes = "",
			options
		} = field as IOptionField;
		return m("fieldset.pa0.bn", {
			// TODO break containerClass usage to match all other widgets
			// class: containerClass
		}, [
			getLabel(id, lbl, required),
			m("div.flex", {
				class: `${txtCls()} ${containerClass}`,
				onchange: setValue(val)
			}, lodash.map(options, ({ value, label = value, icon }) => {
				const checked = val() === value;
				// No requirement for label "for" attribute
				return m("label.flex.items-center", {
					title: label,
					class: `${classes} ${getEnabledClass(disabled, readonly)} ${checked ? actCls() : "dim"} ${classMap.btnBrd()}`
				},
					m("input.clip[type=radio].bg-transparent.bn.outline-0", {
						name, value, checked,
						required, autocomplete,
						disabled: disabled || readonly,
					}),
					icon ? m("i.fa-fw", {
						class: getIcon(icon)
					}) : label
				);
			}))
		]);
	}

}
