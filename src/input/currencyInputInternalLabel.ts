import lodash from "lodash";
import m, { CVnode } from "mithril";
import { FieldType, IPropWidget, IOptionField } from "../interface/widget";
import { inputCls } from "../theme";
import { numberToCurrencyStr, propToNumber, setCurrencyValue } from "./currencyInput";
import { InputInternalLabel } from "./inputInternalLabel";

export class CurrencyInputInternalLabel extends InputInternalLabel {

	public override selected = true;

	protected override viewInput({ attrs: { field, value, xform = value } }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label, placeholder,
			max, maxlength, min, minlength, step, required,
			readonly, disabled, autofocus, autocomplete,
			pattern, inputmode, spellcheck, instant, uiClass = {}, options
		} = field as IOptionField;

		const currency = options && options.length ? options[0].value : "$";
		return m('.flex.flex-row.w-100',
			m("span.mr1.self-center", currency),
			m("input.w-100.bg-transparent.bn.outline-0", {
				id, type: FieldType.text, name, title, placeholder,
				max, maxlength, min, minlength, step, required,
				readonly, disabled, autofocus, autocomplete,
				pattern, inputmode, spellcheck,
				class: inputCls(uiClass),
				value: lodash.isUndefined(xform())
					? null
					: numberToCurrencyStr(propToNumber(xform())),
				// Update value on change or input ("instant" option)
				[instant ? "oninput" : "onchange"]: setCurrencyValue(value)
			}));
	}
}
