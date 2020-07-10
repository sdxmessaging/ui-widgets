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
			options
		} = field as IOptionField;
		const currency = options && options.length ? options[0].value : "$"
		return [
			getLabel(field),
			m(".w-100", {
				class: containerClass
			},
				m(".w-100.flex.items-center", {
					class: inpCls(),
					style: { "flex-shrink": 0 }
				}, [
					m("span.mr1", currency),
					m("input.input-reset.border-box.flex-auto.bg-transparent.bn", {
						id, type: FieldType.text, name, title, placeholder,
						max, maxlength, min, minlength, step, required,
						readonly, disabled, autofocus, autocomplete,
						pattern, inputmode, spellcheck,
						value: lodash.isUndefined(xform())
							? null
							: numberToCurrencyStr(propToNumber(xform())),
						class: `${getEnabledClass(disabled, true)} ${txtCls()} ${classes}`,
						// Update value on change or input ("instant" option)
						[instant ? "oninput" : "onchange"]: setCurrencyValue(value)
					})
				])
			)
		];
	}

}

function propToNumber(value: TProp): number {
	return lodash.isString(value) ? Number.parseInt(value) : Number(value);
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

/**
 * Convert a number into a currency string
 * @param unitTotal total in smallest monetary unit to convert e.g. 12345
 * @return currency string or the unitTotal if not a finite number e.g. "123.45" or NaN
 */
export function numberToCurrencyStr(unitTotal: number) {
	if (!lodash.isFinite(unitTotal)) {
		return undefined;
	}
	const valStr = String(Math.abs(unitTotal));
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
