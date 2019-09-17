import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IPropWidget, TProp } from "../interface/widget";

import { getTheme, inputBorder, inputText, labelCls } from "../theme";
import { getLabel, setValue } from "../utils";

import { CheckboxInput } from "./checkbox";

export class PasswordInput implements ClassComponent<IPropWidget> {

	private showPassword: stream<TProp> = stream<TProp>(false);

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			id, name = id, placeholder,
			required, readonly, disabled, autofocus, autocomplete,
			instant, containerClass, classes = ""
		} = field;
		return [
			m(".flex.justify-between", [
				getLabel(field),
				m(CheckboxInput, {
					field: {
						id: "showpass",
						label: "Show Password",
						type: "checkbox",
						containerClass: labelCls
					},
					value: this.showPassword
				})
			]),
			m(".w-100", {
				class: containerClass
			}, m("input.input-reset.w-100", {
				id, name,
				type: this.showPassword() ? "text" : "password",
				value: value(),
				class: `${disabled ? "o-60 " : ""}${getTheme(["inpHgt"])} ${classes} ${inputBorder} ${inputText}`,
				placeholder, required, readonly, disabled, autofocus, autocomplete,
				// Safari quirk
				autocorrect: "off",
				// Update value on change or input ("instant" option)
				[instant ? "oninput" : "onchange"]: setValue(value)
			}))
		];
	}

}
