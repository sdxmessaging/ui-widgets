import m, { Children, ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class InputInternalLabel implements ClassComponent<IPropWidget> {
    protected selected: boolean;
    private wrapperHeight;
    protected focusIn: () => void;
    protected focusOut: () => void;
    protected viewInput(vnode: CVnode<IPropWidget>): Children;
    oncreate({ dom }: CVnodeDOM<IPropWidget>): void;
    onupdate({ dom }: CVnodeDOM<IPropWidget>): void;
    view(vnode: CVnode<IPropWidget>): m.Vnode<any, any>;
}
