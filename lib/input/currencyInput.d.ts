import m, { CVnode } from "mithril";
import { IConfig } from "../interface/config";
import { IPropWidget, TProp, TPropStream } from "../interface/widget";
import { ValidationBase } from "../validationBase";
export declare class CurrencyInput extends ValidationBase<IPropWidget> {
    view({ attrs }: CVnode<IPropWidget>): m.Vnode<import("../interface/widget").IPropLayoutWidget<import("../interface/widget").IField>, unknown>;
}
export declare function formatCurrency(unitTotal: number, negativeStyle: IConfig["negativeStyle"], invert?: boolean): string | undefined;
export declare function propToNumber(value: TProp): number;
/**
 * Parse a currency string into a number
 * @param currencyStr Value to convert e.g. "123.45"
 * @return parsed value as smallest monetary unit e.g. 12345
 */
export declare function currencyStrToNumber(currencyStr: string): number;
/**
 * Convert a number into a currency string
 * @param unitTotal total in smallest monetary unit to convert e.g. 12345
 * @return currency string if finite number e.g. "123.45" or undefined
 */
export declare function numberToCurrencyStr(unitTotal: number): string | undefined;
/**
 * Convert a number into a currency string pair
 * @param unitTotal total in smallest monetary unit to convert e.g. 12345
 * @return currency string pair if finite number e.g. ["123", "45"] or undefined
 */
export declare function numberToCurrencyTuple(unitTotal: number): [string, string] | undefined;
export declare function setCurrencyValue(val: TPropStream): ({ target: { value } }: {
    target: HTMLInputElement;
}) => TProp | import("mithril/stream")<number>;
