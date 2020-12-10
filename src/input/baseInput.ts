import m, { ClassComponent, CVnode } from "mithril";

import { FieldType, IPropWidget } from "../interface/widget";

import { inpCls } from "../theme";
import { 
	getEnabledClass, 
	getLabel, setValue } from "../utils";

export class BaseInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value, xform = value } }: CVnode<IPropWidget>) {
		const {
			label, id, type = FieldType.text, name = id, title = label, placeholder,
			max, maxlength, min, minlength, step, required,
			readonly, disabled, autofocus, autocomplete,
			pattern, inputmode, spellcheck,
			instant, containerClass, 
			classes = ""
		} = field;
		return [
			m("fieldset.bn.pa0", {
				class: containerClass
			}, m("div", {
				class: `${classes} ${getEnabledClass(disabled, true)} ${inpCls()}`,
			}, 
			getLabel(id, label, required),
			m("input.w-100.bg-transparent.bn.outline-0", {
				id, type, name, title, placeholder,
				max, maxlength, min, minlength, step, required,
				readonly, disabled, autofocus, autocomplete,
				pattern, inputmode, spellcheck,
				value: xform(),
				// Update value on change or input ("instant" option)
				[instant ? "oninput" : "onchange"]: setValue(value)
			})))
		];
	}

}
