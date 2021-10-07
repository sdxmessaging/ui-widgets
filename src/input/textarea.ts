import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { inputWrapperCls, textareaCls, wrapperCls } from "../theme";
import { getLabel, setValue } from "../utils";
import { propInvalid } from "../validation";
import { ViewInputOverride } from "./viewInputOverride";

export class TextareaInput implements ClassComponent<IPropWidget> {

	public view({ attrs }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label, placeholder,
			required, readonly, disabled, autofocus, autocomplete, spellcheck,
			instant, uiClass = {}, floatLabel
		} = attrs.field;
		const { value } = attrs;
		const textarea = m("textarea.w-100.bg-transparent.bn.outline-0.h-100.z-999", {
			id, name, title,
			placeholder, required, readonly, disabled, autofocus, autocomplete, spellcheck,
			class: textareaCls(uiClass),
			value: value(),
			style: { resize: "none" },
			// Update value on change or input ("instant" option)
			[instant ? "oninput" : "onchange"]: setValue(value)
		});
		return !floatLabel ? m("fieldset", {
			class: wrapperCls(uiClass, disabled)
		}, [
			getLabel(id, uiClass, label, required),
			m("div", {
				class: inputWrapperCls(uiClass, propInvalid(attrs.field, value()))
			}, textarea)
		]) : m(ViewInputOverride, { ...attrs, children: textarea });
	}
}
