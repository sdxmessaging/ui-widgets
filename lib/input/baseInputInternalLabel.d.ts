import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class BaseInputInternalLabel implements ClassComponent<IPropWidget> {
    private selected;
    private value;
    private inputEl;
    private focusIn;
    private focusOut;
    oninit({ attrs: { value } }: CVnode<IPropWidget>): void;
    oncreate({ dom }: CVnodeDOM<IPropWidget>): void;
    onremove(): void;
    view({ attrs: { field, value, xform } }: CVnode<IPropWidget>): m.Vnode<any, any>;
}
