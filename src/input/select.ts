import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IOptionField, IPropWidget } from "../interface/widget";

import { inpCls } from "../theme";
import { getEnabledClass, getLabel, setValue } from "../utils";

export class SelectInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value: val } }: CVnode<IPropWidget>) {
		const {
			label: lbl, id, name = id, title = lbl,
			required, readonly, disabled, autofocus, autocomplete,
			containerClass, classes = "",
			options
		} = field as IOptionField;
		return [
			getLabel(id, lbl, required),
			m(".w-100", {
				class: containerClass
			}, m("select.input-reset.border-box.w-100", {
				id, name, title,
				required, readonly, disabled, autofocus, autocomplete,
				value: val(),
				class: `${classes} ${getEnabledClass(disabled, readonly)} ${inpCls()}`,
				onchange: setValue(val)
			},
				lodash.map(options, ({ value, label = value }) => m("option", {
					value,
					disabled: disabled || readonly
				}, label))
			))
		];
	}

}
