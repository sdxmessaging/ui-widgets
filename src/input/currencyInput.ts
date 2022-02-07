import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { FieldType, IOptionField, IPropWidget, TProp, TPropStream } from "../interface/widget";

import { inputCls } from "../theme";
import { propInvalid } from "../validation";
import { selectTarget } from "../utils";

import { LayoutFixed } from "./layout/layoutFixedLabel";

export class CurrencyInput implements ClassComponent<IPropWidget> {

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field, value, xform = value } = attrs;
		const {
			label, id, name = id, title = label, placeholder,
			max, maxlength, min, minlength, step, required,
			readonly, disabled, autofocus, autocomplete, tabindex,
			pattern, inputmode, spellcheck,
			instant, uiClass = {},
			options
		} = field as IOptionField;
		const currency = options && options.length ? options[0].value : "$";
		return m(LayoutFixed, {
			field,
			value,
			invalid: propInvalid(field, value())
		}, m('.flex.flex-row.w-100', m("span.mr1.self-center", {
			class: inputCls(uiClass)
		}, currency),
			m("input.w-100.bg-transparent.bn.outline-0", {
				id, type: FieldType.text, name, title, placeholder,
				max, maxlength, min, minlength, step, required,
				readonly, disabled, autofocus, autocomplete, tabindex,
				pattern, inputmode, spellcheck,
				class: inputCls(uiClass),
				onfocus: selectTarget,
				value: lodash.isUndefined(xform())
					? null
					: numberToCurrencyStr(propToNumber(xform())),
				// Update value on change or input ("instant" option)
				[instant ? "oninput" : "onchange"]: setCurrencyValue(value)
			})
		));
	}

}

export function propToNumber(value: TProp): number {
	return lodash.isString(value) ? lodash.parseInt(value) : Number(value);
}

/**
 * Parse a currency string into a number
 * @param currencyStr Value to convert e.g. "123.45"
 * @return parsed value as smallest monetary unit e.g. 12345
 */
export function currencyStrToNumber(currencyStr: string) {
	// Remove everything but digits and the decimal point
	const inputStr = currencyStr.replace(/[^\d.]/g, "");
	let left;
	let right = 0;
	// split number at decimal point
	if (inputStr.indexOf(".") > -1) {
		const decimalPos = inputStr.indexOf(".");
		const leftStr = inputStr.substring(0, decimalPos);
		// Ensure left component has at least 1 character
		left = lodash.parseInt(lodash.padStart(leftStr, 1, "0"));
		// Only accept first 2 figures after decimal
		const rightStr = inputStr.substring(decimalPos + 1, Math.min(decimalPos + 3, inputStr.length));
		// Ensure right component has 2 characters
		right = lodash.parseInt(lodash.padEnd(rightStr, 2, "0"));
	} else {
		left = lodash.parseInt(inputStr) || 0;
	}
	return left * 100 + right;
}

/**
 * Convert a number into a currency string
 * @param unitTotal total in smallest monetary unit to convert e.g. 12345
 * @return currency string if finite number e.g. "123.45" or undefined
 */
export function numberToCurrencyStr(unitTotal: number) {
	const numPair = numberToCurrencyTuple(unitTotal);
	if (numPair) {
		return `${numPair[0]}.${numPair[1]}`;
	} else {
		return numPair;
	}
}

/**
 * Convert a number into a currency string pair
 * @param unitTotal total in smallest monetary unit to convert e.g. 12345
 * @return currency string pair if finite number e.g. ["123", "45"] or undefined
 */
export function numberToCurrencyTuple(unitTotal: number): [string, string] | undefined {
	if (!lodash.isFinite(unitTotal)) {
		return undefined;
	}
	const valStr = String(Math.abs(unitTotal));
	let large = "0";
	let small = "";
	if (valStr.length > 2) {
		const decimalPos = valStr.length - 2;
		large = valStr.substring(0, decimalPos);
		small = valStr.substring(decimalPos);
	} else {
		small = lodash.padStart(valStr, 2, "0");
	}
	return [large, small];
}

// Currency TProp update helper
export function setCurrencyValue(val: TPropStream) {
	return ({ target: { value } }: { target: HTMLInputElement; }) => val(currencyStrToNumber(value));
}
