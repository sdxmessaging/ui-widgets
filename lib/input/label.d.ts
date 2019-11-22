import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class Label implements ClassComponent<IPropWidget> {
    view({ attrs: { field: { label, title, required } } }: CVnode<IPropWidget>): m.Vnode<any, any>;
}
