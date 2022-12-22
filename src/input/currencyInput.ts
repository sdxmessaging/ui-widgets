import lodash from "lodash";
import m, { CVnode } from "mithril";

import { IConfig } from "../interface/config";
import { FieldType, IPropWidget, TProp, TPropStream } from "../interface/widget";

import { getConfig } from "../config";
import { inputCls, joinClasses, theme } from "../theme";
import { selectTarget, titleFromLabel } from "../utils";

import { ValidationBase } from "../validationBase";
import { LayoutFixed } from "./layout/layoutFixedLabel";

export class CurrencyInput extends ValidationBase<IPropWidget> {

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field, value, xform = value } = attrs;
		const {
			label, id, name = id, title = titleFromLabel(label), placeholder,
			max, maxlength, min, minlength, step, required,
			readonly, disabled, autofocus, autocomplete, tabindex,
			pattern, inputmode, spellcheck,
			uiClass = {}, config
		} = field;
		const symbol = getConfig("currencySymbol", config);
		const negativeStyle = getConfig("negativeStyle", config);
		const badgePosition = getConfig("badgePosition", config);
		const unitTotal = propToNumber(xform());
		return m(LayoutFixed, {
			field,
			value,
			invalid: this.invalid
		}, m('.flex.flex-row.w-100', [
			m("span.self-center", {
				class: joinClasses([
					badgePosition === "left" ? "order-0 mr1" : "order-last ml1",
					inputCls(uiClass)
				])
			}, symbol),
			m("input.w-100.bg-transparent.bn.outline-0", {
				id, type: FieldType.text, name, title, placeholder,
				max, maxlength, min, minlength, step, required,
				readonly, disabled, autofocus, autocomplete, tabindex,
				pattern, inputmode, spellcheck,
				class: joinClasses([
					badgePosition === "right" ? "tr" : "",
					negativeStyle.includes("red") && unitTotal < 0 ? theme.redNumber : null,
					inputCls(uiClass)
				]),
				onfocus: selectTarget,
				value: lodash.isUndefined(xform())
					? null
					: formatCurrency(unitTotal, negativeStyle),
				onchange: setCurrencyValue(value)
			})
		]));
	}

}

export function formatCurrency(unitTotal: number, negativeStyle: IConfig["negativeStyle"]) {
	const currencyStr = numberToCurrencyStr(unitTotal);
	if (unitTotal < 0) {
		if (negativeStyle.toLowerCase().includes("parentheses")) {
			return `(${currencyStr})`;
		} else if (negativeStyle !== "red") {
			return `-${currencyStr}`;
		}
	}
	return currencyStr;
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
	// Remove everything but digits and the decimal point, and keep minus sign
	const inputStr = currencyStr
		.replace("(-", "-")
		.replace("(", "-")
		.replace(")", "")
		.replace(/[^\d.-]/g, "");
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
