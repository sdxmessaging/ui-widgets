import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";
import { IConfig, TSubset } from "../interface/config";

import { config, getConfig } from "../config";
import { checkInputCls, inputWrapperCls, wrapperCls } from "../theme";
import { getLabelText, setCheck } from "../utils";

import { CheckLabel } from "../display/checkLabel";
import { theme } from "../theme";
export class CheckboxInput implements ClassComponent<IPropWidget> {

	protected readonly onIcon: keyof TSubset<IConfig, string> = "checkIcn";
	protected readonly offIcon: keyof TSubset<IConfig, string> = "uncheckIcn";

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label = "", id, name = id, title = label,
			required, readonly, disabled, autocomplete, tabindex = "0",
			uiClass = {}, config: fieldConfig
		} = field;

		const doubleLabel = getConfig("toggleFormat", fieldConfig) === "double";
		const invalidCheckboxWrapper = theme.invalidCheckboxWrapper;

		return m("div", {
			class: wrapperCls(uiClass, disabled),
		}, m("fieldset.w-100.bn", {
			class: inputWrapperCls(uiClass)
		}, [
			m(".flex",
				m("input.clip[type=checkbox]", {
					id, name,
					checked: value(),
					required, autocomplete,
					disabled: disabled || readonly,
					tabindex: -1,
					'aria-hidden': "true",
					onchange: setCheck(value),
				}),
				m("label.flex.flex-start.items-start", {
					tabindex,
					"class": `${checkInputCls(uiClass, disabled, readonly)} ${required && !value() ? invalidCheckboxWrapper : ""}`,
					for: id,
					title,
					"data-input-id": id,
					'aria-label': label,
					onkeydown: (e: KeyboardEvent) => {
						if (e.key === " ") {
							value(!value());
						}
					}
				}, [
					doubleLabel && m(CheckLabel, { field, value, left: true }),
					m("i", {
						class: config[value() ? this.onIcon : doubleLabel ? this.onIcon : this.offIcon],
						style: {
							transform: !value() && doubleLabel ? "scaleX(-1)" : ""
						}
					}),
					label && !doubleLabel && m("span.ml2", getLabelText(label, required)),
					m(CheckLabel, { field, value, left: false })
				])
			)
		]));
	}

}
