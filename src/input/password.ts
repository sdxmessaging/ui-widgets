declare const b: TBss;
import m, { ClassComponent, CVnode } from "mithril";
import stream, { Stream } from "mithril/stream";

import { TBss } from "../interface/style";
import { IPropWidget, TProp } from "../interface/widget";

import { getLabel, inputBorder, inputText, labelCls } from "../utils";
import { CheckboxInput } from "./checkbox";

export class PasswordInput implements ClassComponent<IPropWidget> {

	private showPassword: Stream<TProp> = stream<TProp>(false);

	public view({ attrs: { field, value: val } }: CVnode<IPropWidget>) {
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
			}, m("input.input-reset.w-100" + b.inputHeight, {
				id, name,
				type: this.showPassword() ? "text" : "password",
				value: val(),
				class: `${disabled ? "o-60 " : ""}${classes} ${inputBorder} ${inputText}`,
				placeholder, required, readonly, disabled, autofocus, autocomplete,
				// Safari quirk
				autocorrect: "off",
				// Update value on change or input ("instant" option)
				[instant ? "oninput" : "onchange"]: ({ target: { value } }: { target: HTMLInputElement }) => val(value)
			}))
		];
	}

}
