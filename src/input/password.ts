import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IPropWidget, TProp } from "../interface/widget";

import { config } from "../config";
import { inputCls, inputWrapperCls, wrapperCls } from "../theme";
import { getLabel, setValue } from "../utils";

export class PasswordInput implements ClassComponent<IPropWidget> {

	private showPassword: stream<TProp> = stream<TProp>(false);

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label, placeholder,
			maxlength, minlength, required,
			readonly, disabled, autofocus, autocomplete,
			pattern, inputmode,
			instant, uiClass = {},
		} = field;
		return m("fieldset", {
			class: wrapperCls(uiClass, disabled)
		}, [
			getLabel(id, uiClass, label, required),
			m("div.w-100.flex.items-center", {
				class: inputWrapperCls(uiClass)
			},
				m("input.w-100.bg-transparent.bn.outline-0", {
					id, name, title, placeholder,
					type: this.showPassword() ? "text" : "password",
					maxlength, minlength, required,
					readonly, disabled, autofocus, autocomplete,
					pattern, inputmode,
					class: inputCls(uiClass),
					value: value(),
					// Safari quirk
					autocorrect: "off",
					// Update value on change or input ("instant" option)
					[instant ? "oninput" : "onchange"]: setValue(value)
				}),
				m("i.ml1.pa1.fa-fw.pointer.dim", {
					title: config.showPassTxt,
					class: this.showPassword() ? config.hidePassIcn : config.showPassIcn,
					onclick: () => this.showPassword(!this.showPassword())
				})
			)
		]);
	}

}
