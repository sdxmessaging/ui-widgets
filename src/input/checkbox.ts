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
			containerClass = "", classes = ""
		} = field;
		return m(".w-100", {
			class: `${txtCls()} ${containerClass}`,
		},
			m("label.flex.items-center", {
				title,
				class: `${getEnabledClass(disabled, readonly)} ${classes}`
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
		);
	}

}
