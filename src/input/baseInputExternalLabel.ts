import m, { ClassComponent, CVnode } from "mithril";

import { FieldType, IPropWidget } from "../interface/widget";

import { inputCls, inputWrapperCls, wrapperCls } from "../theme";
import { getLabel, setValue } from "../utils";
import { propInvalid } from "../validation";

export class BaseInputExternalLabel implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value, xform = value } }: CVnode<IPropWidget>) {
		const {
			label, id, type = FieldType.text, name = id, title = label, placeholder,
			max, maxlength, min, minlength, step, required,
			readonly, disabled, autofocus, autocomplete,
			pattern, inputmode, spellcheck,
			instant, uiClass = {}
		} = field;
		return m("fieldset", {
			class: type === FieldType.hidden ? "clip" : wrapperCls(uiClass, disabled)
		}, [
			getLabel(id, uiClass, label, required),
			m("div", {
				class: inputWrapperCls(uiClass, propInvalid(field, xform()))
			}, m("input.w-100.bg-transparent.bn.outline-0", {
				id, type, name, title, placeholder,
				max, maxlength, min, minlength, step, required,
				readonly, disabled, autofocus, autocomplete,
				pattern, inputmode, spellcheck,
				class: inputCls(uiClass),
				value: xform(),
				// Update value on change or input ("instant" option)
				[instant ? "oninput" : "onchange"]: setValue(value)
			}))
		]);
	}

}
