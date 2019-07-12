import lodash from "lodash";
declare const b: TBss;
import m, { ClassComponent, CVnode } from "mithril";

import { TBss } from "../interface/style";
import { IOptionField, IPropWidget } from "../interface/widget";

import { getLabel, inputBorder, inputText } from "../utils";

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
			}, m("select.input-reset.w-100" + b.inputHeight, {
				id, name,
				value: val(),
				class: `${disabled ? "o-60 " : ""}${classes} ${inputBorder} ${inputText}`,
				required, readonly, disabled, autofocus, autocomplete,
				// Update value on selection
				onchange: ({ target: { value } }: { target: HTMLInputElement }) => val(value)
			},
				lodash.map(options, ({ label, value }) => m("option", {
					value
				}, label))
			))
		];
	}

}
