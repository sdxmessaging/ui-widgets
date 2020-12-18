import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";
import { IConfig, TSubset } from "../interface/config";

import { config } from "../config";
import { getIcon, txtCls } from "../theme";
import { getEnabledClass, getLabelText, setCheck } from "../utils";

import { CheckLabel } from "../display/checkLabel";

export class CheckboxInput implements ClassComponent<IPropWidget> {

	protected onIcon: keyof TSubset<IConfig, string> = "checkIcn";
	protected offIcon: keyof TSubset<IConfig, string> = "uncheckIcn";

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label = "", id, name = id, title = label,
			required, readonly, disabled, autocomplete,
			uiClass = {}
		} = field;
		const { wrapper, inputWrapper } = uiClass;

		return m("fieldset.pa0.bn", {
			class: wrapper,
		}, m("div", {
			class: inputWrapper
		}, [
			m("label.flex.items-center", {
				title,
				class: `${getEnabledClass(disabled, readonly)} ${txtCls()}`
			},
				m("input.clip[type=checkbox]", {
					id, name,
					checked: value(),
					required, autocomplete,
					disabled: disabled || readonly,
					onchange: setCheck(value),
				}),
				getLabelText(label, required),
				m("i.ml2", {
					class: getIcon(config[value() ? this.onIcon : this.offIcon])
				}),
				m(CheckLabel, { field, value })
			)
		]));
	}

}
