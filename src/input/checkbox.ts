import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";
import { IConfig, TSubset } from "../interface/config";

import { config } from "../config";
import { checkInputCls, inputWrapperCls, wrapperCls } from "../theme";
import { getLabelText, setCheck } from "../utils";

import { CheckLabel } from "../display/checkLabel";
export class CheckboxInput implements ClassComponent<IPropWidget> {

	protected readonly onIcon: keyof TSubset<IConfig, string> = "checkIcn";
	protected readonly offIcon: keyof TSubset<IConfig, string> = "uncheckIcn";

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label = "", id, name = id, title = label,
			required, readonly, disabled, autocomplete, tabindex = "0",
			uiClass = {}
		} = field;
		return m("div", {
			class: wrapperCls(uiClass, disabled),
		}, m("fieldset.w-100.bn", {
			class: inputWrapperCls(uiClass)
		}, [
			m("label.flex.items-center", {
				"title": title,
				"class": checkInputCls(uiClass, disabled, readonly),
				tabindex,
				for: id,
				"data-input-id": id,
				'aria-label': label,
				onkeydown: (e: KeyboardEvent) => {
					if (e.key === " ") {
						value(!value());
					}
				}
			},
				m("input.clip[type=checkbox]", {
					id, name,
					checked: value(),
					required, autocomplete,
					disabled: disabled || readonly,
					tabindex: -1,
					'aria-hidden': "true",
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
