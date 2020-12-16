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
			options,
			uiClass = {}
		} = field as IOptionField;
		const { wrapper, label: uiLabel = "", inputWrapper = "", input } = uiClass;
		
		return m("fieldset.pa0.bn.flex-wrap", {
			class: wrapper
		}, [
			getLabel(id, lbl, uiLabel, required),
			m("div.flex", {
				class: `${txtCls()} ${inputWrapper}`,
				onchange: setValue(val)
			}, lodash.map(options, ({ value, label = value, icon }) => {
				const checked = val() === value;
				// No requirement for label "for" attribute
				return m("label.flex.items-center", {
					title: label,
					class: `${uiLabel} ${getEnabledClass(disabled, readonly)} ${checked ? actCls() : "dim"} ${classMap.btnBrd()}`
				},
					m("input.clip[type=radio].bg-transparent.bn.outline-0", {
						name, value, checked,
						required, autocomplete,
						disabled: disabled || readonly,
						class: input
					}),
					icon ? m("i.fa-fw", {
						class: getIcon(icon)
					}) : label
				);
			}))
		]);
	}

}
