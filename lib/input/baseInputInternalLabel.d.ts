import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class BaseInputInternalLabel implements ClassComponent<IPropWidget> {
    private selected;
    private focusIn;
    private focusOut;
    view({ attrs: { field, value, xform } }: CVnode<IPropWidget>): m.Vnode<any, any>;
}
