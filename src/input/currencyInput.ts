import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { FieldType, IOptionField, IPropWidget, TProp } from "../interface/widget";

import { inpCls, txtCls } from "../theme";
import { getEnabledClass, getLabel } from "../utils";

export class CurrencyInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value, xform = value } }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label, placeholder,
			max, maxlength, min, minlength, step, required,
			readonly, disabled, autofocus, autocomplete,
			pattern, inputmode, spellcheck,
			instant, containerClass, classes = "",
			options = [{ value: "$" }]
		} = field as IOptionField
		return [
			getLabel(field),
			m(".w-100", {
				class: containerClass
			},
				m(".w-100.flex.items-center", {
					class: inpCls(),
					style: { "flex-shrink": 0 }
				}, [
					m("span.mr1", options[0].value),
					m("input.input-reset.border-box.flex-auto.bg-transparent.bn", {
						id, type: FieldType.text, name, title, placeholder,
						max, maxlength, min, minlength, step, required,
						readonly, disabled, autofocus, autocomplete,
						pattern, inputmode, spellcheck,
						value: numberToCurrencyStr(xform() as number),
						class: `${getEnabledClass(disabled, true)} ${txtCls()} ${classes}`,
						// Update value on change or input ("instant" option)
						[instant ? "oninput" : "onchange"]: setCurrencyValue(value)
					})
				])
			)
		];
	}

}

// Only supports currencies with subunits
export function currencyStrToNumber(val: string) {

	// TODO trim string to numbers and decimal point only
	const inputStr = val.trim();

	let left;
	let right = 0;

	// split number at decimal point
	if (inputStr.indexOf(".") > -1) {
		const decimalPos = inputStr.indexOf(".");
		const leftStr = inputStr.substring(0, decimalPos);
		// Ensure left component has at least 1 character
		left = Number.parseInt(lodash.padStart(leftStr, 1, "0"));
		// Only accept first 2 figures after decimal
		const rightStr = inputStr.substring(decimalPos + 1, Math.min(decimalPos + 3, inputStr.length));
		// Ensure right component has 2 characters
		right = Number.parseInt(lodash.padEnd(rightStr, 2, "0"));
	} else {
		left = Number.parseInt(inputStr) || 0;
	}
	return left * 100 + right;
}

export function numberToCurrencyStr(val: number) {
	if (!lodash.isFinite(val)) {
		return val;
	}
	const valStr = String(val);

	let left = "0";
	let right = "";

	if (valStr.length > 2) {
		const decimalPos = valStr.length - 2;
		left = valStr.substring(0, decimalPos);
		right = valStr.substring(decimalPos);
	} else {
		right = lodash.padStart(valStr, 2, "0");
	}

	return `${left}.${right}`;
}

// Currency TProp update helper
export function setCurrencyValue(val: stream<TProp>) {
	return ({ target: { value } }: { target: HTMLInputElement }) => val(currencyStrToNumber(value));
}
