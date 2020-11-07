import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IPropWidget, TProp } from "../interface/widget";

import { getIcon, inpCls, lblCls } from "../theme";
import { config } from "../config";
import { getEnabledClass, getLabel, setValue } from "../utils";

import { CheckboxInput } from "./checkbox";

export class PasswordInput implements ClassComponent<IPropWidget>  {

	private showPassword: stream<TProp> = stream<TProp>(false);

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label, placeholder,
			maxlength, minlength, required,
			readonly, disabled, autofocus, autocomplete,
			instant, containerClass, classes = ""
		} = field;
		return [
			m(".flex.justify-between", [
				getLabel(id, label, required),
				m(CheckboxInput, {
					field: {
						id: "showpass",
						label: config.showPassTxt,
						type: "checkbox",
						readonly, disabled,
						containerClass: `mb1 ${lblCls()}`
					},
					value: this.showPassword
				},
				)
			]),
			m(".w-100.mb10.relative", {
				class: containerClass
			}, 
				m("input.input-reset.border-box.w-100", {
					id, name, title, placeholder,
					type: this.showPassword() ? "text" : "password",
					maxlength, minlength, required,
					readonly, disabled, autofocus, autocomplete,
					value: value(),
					class: `${getEnabledClass(disabled, true)} ${inpCls()} ${classes}`,
					// Safari quirk
					autocorrect: "off",
					// Update value on change or input ("instant" option)
					[instant ? "oninput" : "onchange"]: setValue(value)
				}),
				m("i.pa1.absolute.bottom-0.right-0.pointer.dim", {
					class: getIcon(this.showPassword() ? config.hidePassIcn : config.showPassIcn),
					onclick: () => {
						this.showPassword(!this.showPassword());
					}
				}),
			),
		];
	}

}
