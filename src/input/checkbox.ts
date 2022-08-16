import m, { ClassComponent, CVnode } from "mithril";

import { IConfig, TSubset } from "../interface/config";
import { ICheckboxField, IPropWidget } from "../interface/widget";

import { config, getConfig } from "../config";
import { checkInputCls, inputWrapperCls, joinClasses, wrapperCls } from "../theme";
import { getLabelText, setCheck } from "../utils";

import { CheckLabel } from "../display/checkLabel";
import { theme } from "../theme";

export class CheckboxInput implements ClassComponent<IPropWidget> {

	protected readonly onIcon: keyof TSubset<IConfig, string> = "checkIcn";
	protected readonly offIcon: keyof TSubset<IConfig, string> = "uncheckIcn";

	public view({ attrs: { field, value: val } }: CVnode<IPropWidget>) {
		const {
			label = "", id, name = id, value, title = label,
			required, readonly, disabled, autocomplete, tabindex = "0",
			options,
			uiClass = {}, config: fieldConfig
		} = field as ICheckboxField;

		const doubleLabel = getConfig("toggleFormat", fieldConfig) === "double";
		const invalidCheckboxWrapper = theme.invalidCheckboxWrapper;

		return m("div", {
			class: wrapperCls(uiClass, disabled),
		}, m("fieldset.w-100.bn", {
			class: inputWrapperCls(uiClass)
		}, [
			m("input.clip[type=checkbox]", {
				id, name, value,
				checked: val(),
				required, autocomplete,
				disabled: disabled || readonly,
				tabindex: -1,
				'aria-hidden': "true",
				onchange: setCheck(val, value)
			}),
			m("label.flex.items-center", {
				class: joinClasses([
					checkInputCls(uiClass, disabled, readonly),
					required && !val() ? invalidCheckboxWrapper : ""
				]),
				for: id,
				title,
				"data-input-id": id,
				"aria-label": label,
				tabindex,
				onkeydown: (e: KeyboardEvent) => {
					if (e.key === " ") {
						val(!val());
					}
				}
			}, [
				doubleLabel && m(CheckLabel, { value: val(), doubleLabel, options, left: true }),
				m("i", {
					class: joinClasses([
						// doubleLabel will always set the "on" icon
						config[val() || doubleLabel ? this.onIcon : this.offIcon],
						// doubleLabel will mirror the icon if value is falsy
						// TODO Rename to "flip-h" with Font Awesome 6
						!val() && doubleLabel ? "fa-flip-horizontal" : ""
					])
				}),
				label && !doubleLabel && m("span.ml2", getLabelText(label, required)),
				m(CheckLabel, { value: val(), doubleLabel, options, left: false })
			])
		]));
	}

}
