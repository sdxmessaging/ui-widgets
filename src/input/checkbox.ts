import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";
import { IConfig, TSubset } from "../interface/config";

import { config } from "../config";
import { checkInputCls, inputWrapperCls, wrapperCls } from "../theme";
import { getLabelText, setCheck } from "../utils";

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
		return m("fieldset", {
			class: wrapperCls(uiClass, disabled),
		}, m("div", {
			class: inputWrapperCls(uiClass)
		}, [
			m("label.flex.items-center", {
				"title": title,
				"class": checkInputCls(uiClass, disabled, readonly),
				"data-input-id": id
			},
				m("input.clip[type=checkbox]", {
					id, name,
					checked: value(),
					required, autocomplete,
					disabled: disabled || readonly,
					onchange: setCheck(value),
				}),
				m("i.mr2", {
					class: config[value() ? this.onIcon : this.offIcon]
				}),
				getLabelText(label, required),
				m(CheckLabel, { field, value })
			)
		]));
	}

}
