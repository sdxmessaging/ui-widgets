import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IPropWidget, TProp } from "../interface/widget";

import { inpCls, lblCls } from "../theme";
import { config } from "../config";
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
						label: config.showPassTxt,
						type: "checkbox",
						containerClass: `mb1 ${lblCls()}`
					},
					value: this.showPassword
				})
			]),
			m(".w-100", {
				class: containerClass
			}, m("input.input-reset.border-box.w-100", {
				id, name,
				type: this.showPassword() ? "text" : "password",
				value: value(),
				class: `${disabled ? "o-60" : ""} ${inpCls()} ${classes}`,
				placeholder, required, readonly, disabled, autofocus, autocomplete,
				// Safari quirk
				autocorrect: "off",
				// Update value on change or input ("instant" option)
				[instant ? "oninput" : "onchange"]: setValue(value)
			}))
		];
	}

}
