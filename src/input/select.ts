import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IOptionField, IPropWidget } from "../interface/widget";

import { getTheme, inputBorder, inputText } from "../theme";
import { getLabel, setValue } from "../utils";

export class SelectInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value: val } }: CVnode<IPropWidget>) {
		const {
			id, name = id,
			required, readonly, disabled, autofocus, autocomplete,
			containerClass, classes = "",
			options
		} = field as IOptionField;
		return [
			getLabel(field),
			m("div", {
				class: containerClass
			}, m("select.input-reset.w-100", {
				id, name,
				value: val(),
				class: `${disabled ? "o-60" : readonly ? "" : "pointer"} ${getTheme(["inpHgt"])} ${classes} ${inputBorder} ${inputText}`,
				required, readonly, disabled, autofocus, autocomplete,
				// Update value on selection
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
