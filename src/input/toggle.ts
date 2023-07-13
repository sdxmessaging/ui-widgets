import m, { ClassComponent, CVnode } from "mithril";

import { IConfig, TIcon, TSubset } from "../interface/config";
import { ICheckboxField, IPropWidget } from "../interface/widget";

import { getConfig, getIcon } from "../config";
import { checkInputCls, inputWrapperCls, joinClasses, theme, wrapperCls } from "../theme";
import { getLabelText, setCheck, titleFromLabel } from "../utils";

type TCheckboxWidget = IPropWidget<ICheckboxField>;
export class ToggleInput implements ClassComponent<TCheckboxWidget> {

	protected readonly onIcon: keyof TSubset<IConfig, TIcon> = "toggleOnIcn";
	protected readonly offIcon: keyof TSubset<IConfig, TIcon> = "toggleOffIcn";

	public view({ attrs: { field, value: val } }: CVnode<TCheckboxWidget>) {
		const {
			label, id, name = id, value, title = titleFromLabel(label),
			required, readonly, disabled, autocomplete, tabindex = "0",
			uiClass = {}, config
		} = field;
		const checked = Boolean(val());
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
			m("label.db.flex.justify-content.items-center", {
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
			}, [
				m(".toggle-outer.relative.dib.transition-bg", {
					class: checked
						? getConfig("toggleOnWrapper", config)
						: getConfig("toggleOffWrapper", config)
				},
					getIcon(getConfig(checked ? this.onIcon : this.offIcon, config), joinClasses([
						"toggle-inner absolute tc transition-transform",
						checked ? "toggle-on" : null
					]))
				),
				label ? m("span.mh1", getLabelText(label, required)) : null
			])
		]));
	}
}
