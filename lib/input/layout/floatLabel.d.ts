import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { IPropWidget } from "../../interface/widget";
export declare class FloatLabel implements ClassComponent<IPropWidget> {
    private focus;
    private focusIn;
    private focusOut;
    private wrapperHeight;
    oncreate({ dom }: CVnodeDOM<IPropWidget>): void;
    onupdate({ dom }: CVnodeDOM<IPropWidget>): void;
    view({ attrs, children }: CVnode<IPropWidget>): m.Vnode<any, any>;
}
