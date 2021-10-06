import m, { CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
import { InputInternalLabel } from "./inputInternalLabel";
export declare class CurrencyInputInternalLabel extends InputInternalLabel {
    selected: boolean;
    protected viewInput({ attrs: { field, value, xform } }: CVnode<IPropWidget>): m.Vnode<any, any>;
}
