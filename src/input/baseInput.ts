import m, { ClassComponent, CVnode } from "mithril";

import { FieldType, IPropWidget } from "../interface/widget";

import { theme } from "../theme";
import { getEnabledClass, getLabel, setValue } from "../utils";

export class BaseInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value, xform = value } }: CVnode<IPropWidget>) {
		const {
			label, id, type = FieldType.text, name = id, title = label, placeholder,
			max, maxlength, min, minlength, step, required,
			readonly, disabled, autofocus, autocomplete,
			pattern, inputmode, spellcheck,
			instant, uiClass = {}
		} = field;
		const { wrapper = "", label: uiLabel, inputWrapper = "", input = "" } = uiClass;
		return m("fieldset", {
			class: `${wrapper} ${theme.wrapper}`
		}, [
			getLabel(id, label, uiLabel, required),
			m("div", {
				class: `${inputWrapper} ${theme.inputWrapper}`
			}, m("input.w-100.bg-transparent.bn.outline-0", {
				id, type, name, title, placeholder,
				max, maxlength, min, minlength, step, required,
				readonly, disabled, autofocus, autocomplete,
				pattern, inputmode, spellcheck,
				class: `${input} ${getEnabledClass(disabled, true)} ${theme.input}`,
				value: xform(),
				// Update value on change or input ("instant" option)
				[instant ? "oninput" : "onchange"]: setValue(value)
			}))
		]);
	}

}
