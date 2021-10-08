import m, { ClassComponent, CVnode } from "mithril";

import { FieldType, IPropWidget } from "../interface/widget";

import { inputCls, inputWrapperCls, wrapperCls } from "../theme";
import { getLabel, setValue } from "../utils";
import { propInvalid } from "../validation";
import { ViewInputOverride } from "./viewInputOverride";

export class BaseInput implements ClassComponent<IPropWidget> {

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field, value, xform = value } = attrs;
		const {
			label, id, type = FieldType.text, name = id, title = label, placeholder,
			max, maxlength, min, minlength, step, required,
			readonly, disabled, autofocus, autocomplete,
			pattern, inputmode, spellcheck,
			instant, uiClass = {}, floatLabel
		} = field;
		const input = m("input.w-100.bg-transparent.bn.outline-0", {
			id, type, name, title, placeholder,
			max, maxlength, min, minlength, step, required,
			readonly, disabled, autofocus, autocomplete,
			pattern, inputmode, spellcheck,
			class: inputCls(uiClass),
			value: xform(),
			style: type === FieldType.text ? { height: "auto" } : null,
			// Update value on change or input ("instant" option)
			[instant ? "oninput" : "onchange"]: setValue(value)
		});
		return !floatLabel ? m("fieldset", {
			class: type === FieldType.hidden ? "clip" : wrapperCls(uiClass, disabled)
		}, [
			getLabel(id, uiClass, label, required),
			m("div", {
				class: inputWrapperCls(uiClass, propInvalid(field, xform()))
			}, input)
		]) : m(ViewInputOverride, { ...attrs, children: input });
	}

}
