import lodash from "lodash";
import m, { CVnode } from "mithril";

import { IOptionField, IPropWidget } from "../interface/widget";

import { inputCls, joinClasses, theme } from "../theme";
import { setValue } from "../utils";

import { BaseWidget } from "../baseWidget";
import { LayoutFixed } from "./layout/layoutFixedLabel";

type TSelectWidget = IPropWidget<IOptionField>;
export class SelectInput extends BaseWidget<TSelectWidget> {

	protected override readonly selector = "select";

	public view({ attrs }: CVnode<TSelectWidget>) {
		const { field, value: val } = attrs;
		const {
			label: lbl, id, name = id, title = lbl,
			required, readonly, disabled, multiple,
			autofocus, autocomplete, tabindex,
			uiClass = {}, placeholder = "Select",
			options = []
		} = field;
		const value = val();
		return m(LayoutFixed, {
			field,
			value: val,
			invalid: this.invalid,
			focus: this.inFocus
		}, [
			lbl ? null : m("legend.screenreader", {
				id: `${id}-legend`
			}, "Select")
			, m("select.w-100.bg-transparent.bn.outline-0", {
				id, name, title,
				required, multiple, autofocus, autocomplete, tabindex,
				disabled: disabled || readonly,
				class: joinClasses([
					inputCls(uiClass),
					value ? "" : theme.floatLabelPlaceholder
				]),
				value: value ?? "",
				onchange: setValue(val),
				'aria-labelledby': `${id}-legend`
			}, [
				lodash.some(options, ({ value }) => !value)
					? null
					: m("option", {
						value: "",
						disabled: true
					}, placeholder),
				lodash.map(options, ({ value, label = value }) => m("option", {
					value,
					disabled: !value || disabled || readonly,
				}, label))
			])
		]);
	}

}
