declare const b: TBss;
import m, { ClassComponent, CVnode } from "mithril";

import { TBss } from "../interface/style";
import { IPropWidget } from "../interface/widget";

import { getLabel, inputBorder, inputText } from "../utils";

export class BaseInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value: val } }: CVnode<IPropWidget>) {
		const { id, type, placeholder, containerClass, classes = "", required, disabled } = field;
		return [
			getLabel(field),
			m(".w-100", {
				class: containerClass
			}, m("input.input-reset.w-100.pa2" + b.inputHeight, {
				id,
				name: id,
				value: val(),
				class: `${disabled ? "o-60 " : ""}${classes} ${inputBorder} ${inputText}`,
				type,
				placeholder,
				required,
				disabled,
				// Update value on type
				onchange: ({ target: { value } }: { target: HTMLInputElement }) => val(value)
			}))
		];
	}

}
