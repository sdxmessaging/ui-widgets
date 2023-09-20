import m, { Children, ClassComponent, CVnode } from "mithril";

import { IConfig, TIcon, TSubset } from "../interface/config";
import { ICheckboxField, IPropWidget, TPropStream } from "../interface/widget";

import { getConfig, getIcon } from "../config";
import { checkInputCls, inputWrapperCls, joinClasses, theme, wrapperCls } from "../theme";
import { getLabelText, setCheck, titleFromLabel } from "../utils";
import { Layout } from "./layout/layout";

type TCheckboxWidget = IPropWidget<ICheckboxField>;
export class ToggleInput implements ClassComponent<TCheckboxWidget> {

	protected readonly onIcon: keyof TSubset<IConfig, TIcon> = "toggleOnIcn";
	protected readonly offIcon: keyof TSubset<IConfig, TIcon> = "toggleOffIcn";

	private toggleWrapper(field: ICheckboxField, val: TPropStream, children: Children) {
		const {
			label, id, name = id, value, title = titleFromLabel(label),
			required, readonly, disabled, autocomplete, tabindex = "0",
			uiClass = {}
		} = field;
		return [
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
			}, children)
		];
	}

	private toggleInner(checked: boolean, config?: Partial<IConfig>) {
		return m(".toggle-outer.relative.dib.transition-bg", {
			class: checked
				? getConfig("toggleOnWrapper", config)
				: getConfig("toggleOffWrapper", config)
		},
			getIcon(getConfig(checked ? this.onIcon : this.offIcon, config), joinClasses([
				"toggle-inner absolute tc transition-transform",
				checked ? "toggle-on" : null
			]))
		);
	}

	public view({ attrs: { field, value: val } }: CVnode<TCheckboxWidget>) {
		const {
			label, required, disabled,
			uiClass = {}, layout, config
		} = field;
		const checked = Boolean(val());
		return layout
			// Toggle in widget layout
			? m(Layout, {
				field,
				value: val,
				invalid: required ? !val() : false
			}, this.toggleWrapper(field, val,
				this.toggleInner(checked, config)
			))
			// Toggle with inline label
			: m("div", {
				class: wrapperCls(uiClass, disabled),
			}, m("fieldset.w-100.bn", {
				class: inputWrapperCls(uiClass)
			}, this.toggleWrapper(field, val, [
				this.toggleInner(checked, config),
				label ? m("span.mh1", getLabelText(label, required)) : null
			])));
	}
}
