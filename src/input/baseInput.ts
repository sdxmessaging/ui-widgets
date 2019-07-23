import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { getLabel, getTheme, inputBorder, inputText, setValue } from "../utils";

export class BaseInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			id, type, name = id, placeholder,
			required, readonly, disabled, autofocus, autocomplete, spellcheck,
			instant, containerClass, classes = ""
		} = field;
		return [
			getLabel(field),
			m(".w-100", {
				class: containerClass
			}, m("input.input-reset.w-100", {
				id, name, type,
				value: value(),
				class: `${disabled ? "o-60 " : ""}${getTheme(["inpHgt"])} ${classes} ${inputBorder} ${inputText}`,
				placeholder, required, readonly, disabled, autofocus, autocomplete, spellcheck,
				// Update value on change or input ("instant" option)
				[instant ? "oninput" : "onchange"]: setValue(value)
			}))
		];
	}

}
