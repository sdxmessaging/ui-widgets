import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IOptionField, IPropWidget } from "../interface/widget";

import { theme } from "../theme";
import { getEnabledClass, getLabel, setValue } from "../utils";

export class RadioInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value: val } }: CVnode<IPropWidget>) {
		const {
			label: lbl, id, name = id,
			required, readonly, disabled, autocomplete,
			options,
			uiClass = {}
		} = field as IOptionField;
		const { wrapper = "", label: uiLabel, inputWrapper = "", input = "" } = uiClass;
		return m("fieldset", {
			class: `${wrapper} ${theme.wrapper}`
		}, [
			getLabel(id, lbl, uiLabel, required),
			m("div", {
				class: `${inputWrapper} ${theme.inputWrapper}`,
				onchange: setValue(val)
			}, lodash.map(options, ({ value, label = value, icon }) => {
				const checked = val() === value;
				// No requirement for label "for" attribute
				return m("label.dib", {
					title: label,
					class: `${input} ${getEnabledClass(disabled, readonly)} ${checked ? theme.radioChecked : ""} ${theme.radio}`
				},
					m("input.clip[type=radio]", {
						name, value, checked,
						required, autocomplete,
						disabled: disabled || readonly
					}),
					icon ? m("i.fa-fw", {
						class: icon
					}) : label
				);
			}))
		]);
	}

}
