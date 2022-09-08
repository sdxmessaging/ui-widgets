import m, { ClassComponent, CVnode } from "mithril";

import { IConfig, TSubset } from "../interface/config";
import { ICheckboxField, IPropWidget } from "../interface/widget";

import { getConfig } from "../config";
import { checkInputCls, inputWrapperCls, joinClasses, theme, wrapperCls } from "../theme";
import { getLabelText, setCheck, titleFromLabel } from "../utils";

import { SelectionInner } from "./layout/SelectionInner";

export class CheckboxInput implements ClassComponent<IPropWidget> {

	protected readonly onIcon: keyof TSubset<IConfig, string> = "checkIcn";
	protected readonly offIcon: keyof TSubset<IConfig, string> = "uncheckIcn";

	public view({ attrs: { field, value: val } }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, value, title = titleFromLabel(label),
			required, readonly, disabled, autocomplete, tabindex = "0",
			uiClass = {}, config
		} = field as ICheckboxField;
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
			m("label.db", {
				class: joinClasses([
					checkInputCls(uiClass, disabled, readonly),
					required && !val() ? theme.invalidCheckboxWrapper : ""
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
			}, m(SelectionInner, {
				selected: Boolean(val()),
				label: label ? m("span.mh1", getLabelText(label, required)) : null,
				onIcon: getConfig(this.onIcon, config),
				offIcon: getConfig(this.offIcon, config),
				config
			}))
		]));
	}

}
