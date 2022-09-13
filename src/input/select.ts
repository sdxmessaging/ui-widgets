import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IOptionField, IPropWidget } from "../interface/widget";

import { inputCls } from "../theme";
import { setValue } from "../utils";
import { propInvalid } from "../validation";

import { LayoutFixed } from "./layout/layoutFixedLabel";

type TSelectWidget = IPropWidget<IOptionField>;
export class SelectInput implements ClassComponent<TSelectWidget> {

	public view({ attrs }: CVnode<TSelectWidget>) {

		const { field, value: val } = attrs;
		const {
			label: lbl, id, name = id, title = lbl,
			required, readonly, disabled, autofocus, autocomplete, tabindex,
			uiClass = {}, placeholder = "--- Select one ---",
			options
		} = field;
		return m(LayoutFixed, {
			field,
			value: val,
			invalid: propInvalid(field, val())
		}, [
			lbl
				? null
				: m("legend.screenreader", {
					id: `${id}-legend`
				}, "Select one")
			, m("select.w-100.bg-transparent.bn.outline-0", {
				id, name, title,
				required, autofocus, autocomplete, tabindex,
				disabled: disabled || readonly,
				class: inputCls(uiClass),
				value: val() ? val() : "",
				onchange: setValue(val),
				'aria-labelledby': `${id}-legend`
			}, m('option', {
				disabled: true,
				value: ""
			}, placeholder),
				lodash.map(options, ({ value, label = value }) => m("option", {
					value,
					disabled: disabled || readonly,
				}, label)))
		]);
	}

}
