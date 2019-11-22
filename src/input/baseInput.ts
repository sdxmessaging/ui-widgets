import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { inpCls } from "../theme";
import { getLabel, setValue } from "../utils";

export class BaseInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label, id, type, name = id, title = label, placeholder,
			max, maxlength, min, minlength, step, required,
			readonly, disabled, autofocus, autocomplete,
			pattern, inputmode, spellcheck,
			instant, containerClass, classes = ""
		} = field;
		return [
			getLabel(field),
			m(".w-100", {
				class: containerClass
			}, m("input.input-reset.border-box.w-100", {
				id, type, name, title, placeholder,
				max, maxlength, min, minlength, step, required,
				readonly, disabled, autofocus, autocomplete,
				pattern, inputmode, spellcheck,
				value: value(),
				class: `${disabled ? "o-60" : ""} ${inpCls()} ${classes}`,
				// Update value on change or input ("instant" option)
				[instant ? "oninput" : "onchange"]: setValue(value)
			}))
		];
	}

}
