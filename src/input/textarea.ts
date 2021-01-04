import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { theme } from "../theme";
import { getEnabledClass, getLabel, setValue } from "../utils";

export class TextareaInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label, placeholder,
			required, readonly, disabled, autofocus, autocomplete, spellcheck,
			instant, uiClass = {},
		} = field;
		const { wrapper = "", label: uiLabel, inputWrapper = "", input = "" } = uiClass;
		return m("fieldset", {
			class: `${wrapper} ${theme.wrapper}`
		}, [
			getLabel(id, label, uiLabel, required),
			m("div", {
				class: `${inputWrapper} ${theme.inputWrapper}`
			}, m("textarea.w-100.bg-transparent.bn.outline-0[rows=3]", {
				id, name, title,
				placeholder, required, readonly, disabled, autofocus, autocomplete, spellcheck,
				class: `${input} ${getEnabledClass(disabled, true)} ${theme.textarea}`,
				value: value(),
				style: { resize: "vertical" },
				// Update value on change or input ("instant" option)
				[instant ? "oninput" : "onchange"]: setValue(value)
			})
			)
		]);
	}

}
