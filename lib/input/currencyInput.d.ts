import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";
import { IPropWidget, TProp } from "../interface/widget";
export declare class CurrencyInput implements ClassComponent<IPropWidget> {
    view({ attrs: { field, value, xform } }: CVnode<IPropWidget>): (m.Vnode<any, any> | null)[];
}
export declare function currencyStrToNumber(val: string): number;
export declare function numberToCurrencyStr(val: number): string | number;
export declare function setCurrencyValue(val: stream<TProp>): ({ target: { value } }: {
    target: HTMLInputElement;
}) => stream<string | number | boolean>;
