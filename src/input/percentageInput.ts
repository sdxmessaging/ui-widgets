import m, { ClassComponent, CVnode } from "mithril";

import { FieldType, IOptionField, IPropWidget, } from "../interface/widget";

import { inputCls } from "../theme";
import { propInvalid } from "../validation";
import { selectTarget, setValue } from "../utils";

import { LayoutFixed } from "./layout/layoutFixedLabel";

export class PercentageInput implements ClassComponent<IPropWidget> {

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field, value, xform = value } = attrs;
		const {
			label, id, name = id, title = label, placeholder,
			max, maxlength, min, minlength, step, required,
			readonly, disabled, autofocus, autocomplete, tabindex,
			pattern, inputmode, spellcheck,
			instant, uiClass = {},
		} = field as IOptionField;
		return m(LayoutFixed, {
			field,
			value,
			invalid: propInvalid(field, value())
		},
			m('.flex.flex-row.w-100', [
				m("input.w-100.bg-transparent.bn.outline-0", {
					id, type: FieldType.text, name, title, placeholder,
					max, maxlength, min, minlength, step, required,
					readonly, disabled, autofocus, autocomplete, tabindex,
					pattern, inputmode, spellcheck,
					class: inputCls(uiClass),
					onfocus: selectTarget,
					value: xform(),
					// Update value on change or input ("instant" option)
					[instant ? "oninput" : "onchange"]: setValue(value)
				}),
				m("span.mr1.self-center", {
					class: inputCls(uiClass)
				}, "%")
			]));
	}
}
