import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IPropWidget, TProp } from "../interface/widget";

import { getIcon, inpCls, txtCls } from "../theme";
import { config } from "../config";
import { getEnabledClass, getLabel, setValue } from "../utils";

export class PasswordInput implements ClassComponent<IPropWidget> {

	private showPassword: stream<TProp> = stream<TProp>(false);

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label, placeholder,
			maxlength, minlength, required,
			readonly, disabled, autofocus, autocomplete,
			instant, containerClass, classes = ""
		} = field;
		return [
			m("fieldset.bn.pa0", {
				class: containerClass
			},
				getLabel(id, label, required),
				m("div.w-100.flex.items-center.flex-auto bg-white", {
					class: `${classes} ${getEnabledClass(disabled, true)} ${txtCls()} ${inpCls()} `,
				},
					m("input.w-100.bg-transparent.bn.outline-0", {
						id, name, title, placeholder,
						type: this.showPassword() ? "text" : "password",
						maxlength, minlength, required,
						readonly, disabled, autofocus, autocomplete,
						value: value(),
						// Safari quirk
						autocorrect: "off",
						// Update value on change or input ("instant" option)
						[instant ? "oninput" : "onchange"]: setValue(value)
					}),
					m("i.ml1.pa1.fa-fw.pointer.dim", {
						title: config.showPassTxt,
						class: getIcon(this.showPassword() ? config.hidePassIcn : config.showPassIcn),
						onclick: () => this.showPassword(!this.showPassword())
					})
				)
			)
		];
	}

}
