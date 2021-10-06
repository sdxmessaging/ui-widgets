import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class CurrencyInputInternalLabel implements ClassComponent<IPropWidget> {
    view({ attrs: { field, value, xform } }: CVnode<IPropWidget>): m.Vnode<any, any>;
}
