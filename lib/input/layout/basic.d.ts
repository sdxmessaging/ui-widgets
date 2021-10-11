import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../../interface/widget";
export declare class Basic implements ClassComponent<IPropWidget> {
    view({ attrs, children }: CVnode<IPropWidget>): m.Vnode<any, any>;
}
