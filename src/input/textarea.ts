import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { areaCls } from "../theme";
import { getEnabledClass, getLabel, setValue } from "../utils";

export class TextareaInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label, placeholder,
			required, readonly, disabled, autofocus, autocomplete, spellcheck,
			instant, containerClass, classes = ""
		} = field;
		return m("fieldset.pa0.bn", {
			class: containerClass
		}, [
			getLabel(id, label, required),
			m("div", {
			}, m("textarea.w-100[rows=3]", {
				id, name, title,
				placeholder, required, readonly, disabled, autofocus, autocomplete, spellcheck,
				class: `${classes} ${getEnabledClass(disabled, true)} ${areaCls()}`,
				value: value(),
				style: { resize: "vertical" },
				// Update value on change or input ("instant" option)
				[instant ? "oninput" : "onchange"]: setValue(value)
			})
			)
		]);
	}

}
