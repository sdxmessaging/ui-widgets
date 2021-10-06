import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class InputInternalLabel implements ClassComponent<IPropWidget> {
    protected selected: boolean;
    protected focusIn: () => void;
    protected focusOut: () => void;
    protected viewInput(vnode: CVnode<IPropWidget>): m.Vnode<any, any>;
    view(vnode: CVnode<IPropWidget>): m.Vnode<any, any>;
}
