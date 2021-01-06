import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { inputWrapperCls, textareaCls, wrapperCls } from "../theme";
import { getLabel, setValue } from "../utils";

export class TextareaInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label, placeholder,
			required, readonly, disabled, autofocus, autocomplete, spellcheck,
			instant, uiClass = {},
		} = field;
		return m("fieldset", {
			class: wrapperCls(uiClass)
		}, [
			getLabel(id, uiClass, label, required),
			m("div", {
				class: inputWrapperCls(uiClass)
			}, m("textarea.w-100.bg-transparent.bn.outline-0[rows=3]", {
				id, name, title,
				placeholder, required, readonly, disabled, autofocus, autocomplete, spellcheck,
				class: textareaCls(uiClass, disabled, true),
				value: value(),
				style: { resize: "vertical" },
				// Update value on change or input ("instant" option)
				[instant ? "oninput" : "onchange"]: setValue(value)
			})
			)
		]);
	}

}
