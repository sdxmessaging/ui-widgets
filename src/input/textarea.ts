import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { getLabel, inputBorder, inputText } from "../utils";

export class TextareaInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value: val } }: CVnode<IPropWidget>) {
		const { prop, placeholder, classes, containerClass, required, disabled } = field;
		return [
			getLabel(field),
			m("div", {
				class: containerClass
			}, m("textarea.w-100.pa2[rows=3]", {
				id: prop,
				name: prop,
				value: val(),
				class: `${disabled ? "o-60 " : ""}${classes} ${inputBorder} ${inputText}`,
				placeholder,
				style: { resize: "vertical" },
				required,
				disabled,
				// Update value on type
				onchange: ({ target: { value } }: { target: HTMLInputElement }) => val(value)
			}))
		];
	}

}
