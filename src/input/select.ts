import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IOptionField, IPropWidget } from "../interface/widget";

import { inputCls } from "../theme";
import { setValue } from "../utils";
import { propInvalid } from "../validation";

import { Layout } from "./layout/layout";

export class SelectInput implements ClassComponent<IPropWidget> {

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field, value: val } = attrs;
		const {
			label: lbl, id, name = id, title = lbl,
			required, readonly, disabled, autofocus, autocomplete,
			uiClass = {},
			options
		} = field as IOptionField;
		return m(Layout, {field, value: val, invalid: propInvalid(field, val())}, m("select.w-100.bg-transparent.bn.outline-0", {
			id, name, title,
			required, readonly, disabled, autofocus, autocomplete,
			class: inputCls(uiClass),
			value: val(),
			onchange: setValue(val)
		}, lodash.map(options, ({ value, label = value }) => m("option", {
			value,
			disabled: disabled || readonly
		}, label))));
	}

}
