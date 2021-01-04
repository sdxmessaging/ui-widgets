import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IOptionField, IPropWidget } from "../interface/widget";

import { theme } from "../theme";
import { getEnabledClass, getLabel, setValue } from "../utils";

export class SelectInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value: val } }: CVnode<IPropWidget>) {
		const {
			label: lbl, id, name = id, title = lbl,
			required, readonly, disabled, autofocus, autocomplete,
			uiClass = {},
			options
		} = field as IOptionField;
		const { wrapper = "", label: uiLabel, inputWrapper = "", input = "" } = uiClass;
		return m("fieldset", {
			class: `${wrapper} ${theme.wrapper}`
		}, [
			getLabel(id, lbl, uiLabel, required),
			m("div", {
				class: `${inputWrapper} ${theme.inputWrapper}`
			},
				m("select.w-100.bg-transparent.bn.outline-0", {
					id, name, title,
					required, readonly, disabled, autofocus, autocomplete,
					class: `${input} ${getEnabledClass(disabled, true)} ${theme.input}`,
					value: val(),
					onchange: setValue(val)
				}, lodash.map(options, ({ value, label = value }) => m("option", {
					value,
					disabled: disabled || readonly
				}, label)))
			)
		]);
	}

}
