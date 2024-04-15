import lodash from "lodash";

/**
 * ui-widgets currency conversion utils,
 * use with integer values of smallest currency units
 */
export class Currency {

	private static formatter = new Intl.NumberFormat();

	/**
	 * Format a number into a currency string
	 * @param unitTotal total in smallest monetary unit to convert e.g. 12345
	 * @param negativeParens whether to format negative numbers with parentheses
	 * @param invert interpret postive/negative `unitTotal` as the opposite
	 * @return currency string if finite number e.g. "1,234,567.89", "-1.23", "(4.56)", or undefined
	 */
	static format(unitTotal: number, negativeParens: boolean = false, invert: boolean = false) {
		const currencyStr = this.numtoStr(unitTotal, true);
		const negative = invert ? unitTotal > 0 : unitTotal < 0;
		if (currencyStr && negative) {
			// Valid negative currency
			return negativeParens ? `(${currencyStr})` : `-${currencyStr}`;
		} else {
			// Positive, zero, or invalid currency
			return currencyStr;
		}
	}

	/**
	 * Parse a currency string into a number
	 * @param currencyStr Value to convert e.g. "123.45"
	 * @return parsed value as smallest monetary unit e.g. 12345
	 */
	static strToNum(currencyStr: string) {
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
		return left < 0
			? left * 100 - right
			: left * 100 + right;
	}

	/**
	 * Convert a number into a currency string
	 * @param unitTotal total in smallest monetary unit to convert e.g. 12345
	 * @param format whether to format the large number with commas
	 * @return currency string if finite number e.g. "123.45" or undefined
	 */
	static numtoStr(unitTotal: number, format?: boolean) {
		const tuple = this.numToTuple(unitTotal);
		if (tuple) {
			const large = format ? this.formatter.format(tuple[0]) : tuple[0];
			const small = lodash.padStart(String(tuple[1]), 2, "0");
			return `${large}.${small}`;
		} else {
			return undefined;
		}
	}

	/**
	 * Convert a number into a currency string pair
	 * @param unitTotal total in smallest monetary unit to convert e.g. 12345
	 * @return currency string pair if finite number e.g. ["123", "45"] or undefined
	 */
	static numToTuple(unitTotal: number): [number, number] | undefined {
		if (!lodash.isFinite(unitTotal)) {
			return undefined;
		}
		const value = Math.abs(unitTotal);
		let large = 0;
		let small: number;
		if (value > 99) {
			// Ensure integer result
			large = Math.trunc(value / 100);
			small = value % 100;
		} else {
			small = value;
		}
		return [large, small];
	}

}
