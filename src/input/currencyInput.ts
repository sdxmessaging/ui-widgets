import lodash from "lodash";
import m, { CVnode } from "mithril";

import { IConfig } from "../interface/config";
import { FieldType, IPropWidget, TProp, TPropStream } from "../interface/widget";

import { getConfig } from "../config";
import { inputCls, joinClasses, theme } from "../theme";
import { selectTarget, titleFromLabel } from "../utils";

import { Currency } from "../currency";
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
		const inputClass = inputCls(uiClass);
		// Handle negative currency values
		const negative = unitTotal < 0;
		const redNegative = negativeStyle === "red";
		const redNumber = redNegative || negativeStyle === "redParentheses";
		const negativeParens = negativeStyle === "parentheses" || negativeStyle === "redParentheses";
		return m(LayoutFixed, {
			field,
			value,
			invalid: this.invalid,
			focus: this.inFocus
		}, m(".flex.w-100", [
			m("span.self-center", {
				class: joinClasses([
					badgePosition === "left" ? "order-0 mr1" : "order-last ml1",
					inputClass
				])
			}, symbol),
			m("input.absolute.pa0.w1.o-0.pe-none[type=number]", {
				name, value: unitTotal,
				max, maxlength, min, minlength, step, required, readonly, disabled,
				tabindex: -1,
				ariaHidden: "true"
			}),
			m("input.w-100.bg-transparent.bn.outline-0", {
				id, type: FieldType.text,
				name: `${name}-currency`, title, placeholder,
				required, readonly, disabled, autofocus, autocomplete, tabindex,
				pattern, inputmode, spellcheck,
				class: joinClasses([
					badgePosition === "right" ? "tr" : "",
					redNumber && negative ? theme.redNumber : null,
					inputClass
				]),
				onfocus: selectTarget,
				onblur: this.touch,
				value: lodash.isUndefined(xform())
					? null
					// "Flip" negative "red" numbers, remove the minus sign
					: Currency.format(unitTotal, negativeParens, redNegative && negative),
				onchange: setCurrencyValue(value)
			})
		]));
	}

}

export function propToNumber(value: TProp): number {
	return lodash.isString(value) ? lodash.parseInt(value) : Number(value);
}

// Currency TProp update helper
export function setCurrencyValue(val: TPropStream) {
	return ({ target: { value } }: { target: HTMLInputElement; }) => val(Currency.strToNum(value));
}

/**
 * @deprecated Use Currency.format instead
 */
export function formatCurrency(unitTotal: number, negativeStyle: IConfig["negativeStyle"], invert: boolean = false) {
	const currencyStr = numberToCurrencyStr(unitTotal);
	const invertNegative = invert ? unitTotal > 0 : unitTotal < 0;
	if (invertNegative) {
		if (negativeStyle.toLowerCase().includes("parentheses")) {
			return `(${currencyStr})`;
		} else if (negativeStyle !== "red") {
			return `-${currencyStr}`;
		}
	}
	return currencyStr;
}

/**
 * @deprecated Use Currency.strToNum instead
 * Parse a currency string into a number
 * @param currencyStr Value to convert e.g. "123.45"
 * @return parsed value as smallest monetary unit e.g. 12345
 */
export function currencyStrToNumber(currencyStr: string) {
	return Currency.strToNum(currencyStr);
}

/**
 * @deprecated Use Currency.numtoStr instead
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
 * @deprecated Use Currency.numToTuple instead
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
