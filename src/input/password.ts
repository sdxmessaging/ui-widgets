import m, { CVnode } from "mithril";
import stream from "mithril/stream";

import { IPropWidget } from "../interface/widget";

import { getConfig, getIcon } from "../config";
import { inputCls } from "../theme";
import { clickOnEnter, setValue, titleFromLabel } from "../utils";

import { BaseWidget } from "../baseWidget";
import { Layout } from "./layout/layout";

export class PasswordInput extends BaseWidget<IPropWidget> {

	private showPassword = stream<boolean>(false);

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field, value } = attrs;
		const {
			label, id, name = id, title = titleFromLabel(label), placeholder,
			maxlength, minlength, required,
			readonly, disabled, autofocus, autocomplete, tabindex,
			pattern, inputmode,
			instant, uiClass = {}, config
		} = field;
		return m(Layout, {
			field,
			value,
			invalid: this.invalid,
			focus: this.inFocus
		}, m('.flex.flex-row.w-100', [
			m("input.w-100.bg-transparent.bn.outline-0", {
				id, name, title, placeholder,
				type: this.showPassword() ? "text" : "password",
				maxlength, minlength, required,
				readonly, disabled, autofocus, autocomplete, tabindex,
				pattern, inputmode,
				class: inputCls(uiClass),
				value: value(),
				// Safari quirk
				autocorrect: "off",
				// Update value on change or input ("instant" option)
				[instant ? "oninput" : "onchange"]: setValue(value)
			}),
			// Show/hide password toggle
			m(".ml1.pointer.dim", {
				title: getConfig("showPassTxt", config),
				onclick: () => this.showPassword(!this.showPassword()),
				tabindex: 0,
				onkeydown: clickOnEnter
			},
				getIcon(getConfig(this.showPassword() ? "hidePassIcn" : "showPassIcn", config), "db pa1")
			)
		]));
	}
}
