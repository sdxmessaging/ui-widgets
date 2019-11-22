import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IOptionField, IPropWidget } from "../interface/widget";

import { inpCls } from "../theme";
import { getLabel, setValue } from "../utils";

export class SelectInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value: val } }: CVnode<IPropWidget>) {
		const {
			id, name = id, title = field.label,
			required, readonly, disabled, autofocus, autocomplete,
			containerClass, classes = "",
			options
		} = field as IOptionField;
		return [
			getLabel(field),
			m("div", {
				class: containerClass
			}, m("select.input-reset.border-box.w-100", {
				id, name, title,
				required, readonly, disabled, autofocus, autocomplete,
				value: val(),
				class: `${disabled ? "o-60" : readonly ? "" : "pointer"} ${inpCls()} ${classes}`,
				onchange: setValue(val)
			},
				lodash.map(options, ({ label, value }) => m("option", {
					value,
					disabled: disabled || readonly
				}, label))
			))
		];
	}

}
