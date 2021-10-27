import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IPropWidget } from "../interface/widget";

import { config } from "../config";
import { inputCls } from "../theme";
import { setValue } from "../utils";
import { propInvalid } from "../validation";


import { Layout } from "./layout/layout";


export class PasswordInput implements ClassComponent<IPropWidget> {

	private showPassword = stream<boolean>(false);

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field, value } = attrs;
		const {
			label, id, name = id, title = label, placeholder,
			maxlength, minlength, required,
			readonly, disabled, autofocus, autocomplete,
			pattern, inputmode,
			instant, uiClass = {}
		} = field;
		return m(Layout, {
			field,
			value,
			invalid: propInvalid(field, value())
		}, m('.flex.flex-row.w-100', [
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
		]));
	}
}
