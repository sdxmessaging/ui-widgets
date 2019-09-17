import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { inputBorder, inputText } from "../theme";
import { getLabel, setValue } from "../utils";

export class TextareaInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			id, name = id, placeholder,
			required, readonly, disabled, autofocus, autocomplete, spellcheck,
			instant, containerClass, classes = ""
		} = field;
		return [
			getLabel(field),
			m("div", {
				class: containerClass
			}, m("textarea.w-100[rows=3]", {
				id, name,
				value: value(),
				class: `${disabled ? "o-60 " : ""}${classes} ${inputBorder} ${inputText}`,
				placeholder, required, readonly, disabled, autofocus, autocomplete, spellcheck,
				style: { resize: "vertical" },
				// Update value on change or input ("instant" option)
				[instant ? "oninput" : "onchange"]: setValue(value)
			}))
		];
	}

}
