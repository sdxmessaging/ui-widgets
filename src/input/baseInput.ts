declare const b: TBss;
import m, { ClassComponent, CVnode } from "mithril";

import { TBss } from "../interface/style";
import { IPropWidget, TProp } from "../interface/widget";

import { getLabel, inputBorder, inputText } from "../utils";

export class BaseInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value: val } }: CVnode<IPropWidget>) {
		const {
			id, type, name = id, placeholder,
			required, readonly, disabled, autofocus, autocomplete,
			instant, containerClass, classes = "",
			xform = relayProp
		} = field;
		return [
			getLabel(field),
			m(".w-100", {
				class: containerClass
			}, m("input.input-reset.w-100.pa2" + b.inputHeight, {
				id, name, type,
				value: val(),
				class: `${disabled ? "o-60 " : ""}${classes} ${inputBorder} ${inputText}`,
				placeholder, required, readonly, disabled, autofocus, autocomplete,
				// Update value on change or input (controlled by instant flag
				[instant ? "oninput" : "onchange"]: ({ target: { value } }: { target: HTMLInputElement }) => val(xform(value)),
			}))
		];
	}

}

function relayProp(value: TProp): TProp {
	return value;
}
