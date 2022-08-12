import m, { ClassComponent, CVnode } from "mithril";

import { IConfig, TSubset } from "../interface/config";
import { ICheckboxField, IPropWidget } from "../interface/widget";

import { config, getConfig } from "../config";
import { checkInputCls, inputWrapperCls, wrapperCls } from "../theme";
import { getLabelText, setCheck } from "../utils";

import { CheckLabel } from "../display/checkLabel";
import { theme } from "../theme";
export class CheckboxInput implements ClassComponent<IPropWidget> {

	protected readonly onIcon: keyof TSubset<IConfig, string> = "checkIcn";
	protected readonly offIcon: keyof TSubset<IConfig, string> = "uncheckIcn";


	public oninit({ attrs: { field, value }}: CVnode<IPropWidget>) {
		const { defaultChecked = false } = field as ICheckboxField;
		value(defaultChecked);
	}

	public view({ attrs: { field, value: val } }: CVnode<IPropWidget>) {
		const {
			label = "", id, name = id, title = label,
			required, readonly, disabled, autocomplete, tabindex = "0",
			uiClass = {}, config: fieldConfig, value
		} = field as ICheckboxField;

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
					checked: val(),
					required, autocomplete,
					disabled: disabled || readonly,
					tabindex: -1,
					'aria-hidden': "true",
					onchange: setCheck(val),
					value
				}),
				m("label.flex.flex-start.items-start", {
					tabindex,
					"class": `${checkInputCls(uiClass, disabled, readonly)} ${required && !val() ? invalidCheckboxWrapper : ""}`,
					for: id,
					title,
					"data-input-id": id,
					'aria-label': label,
					onkeydown: (e: KeyboardEvent) => {
						if (e.key === " ") {
							val(!val());
						}
					}
				}, [
					doubleLabel && m(CheckLabel, { field, value: val, left: true }),
					m("i", {
						class: config[val() ? this.onIcon : doubleLabel ? this.onIcon : this.offIcon],
						style: {
							transform: !val() && doubleLabel ? "scaleX(-1)" : ""
						}
					}),
					label && !doubleLabel && m("span.ml2", getLabelText(label, required)),
					m(CheckLabel, { field, value: val, left: false })
				])
			)
		]));
	}

}
