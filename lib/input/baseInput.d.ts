import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class BaseInput implements ClassComponent<IPropWidget> {
    view({ attrs: { field, value: val } }: CVnode<IPropWidget>): m.Vnode<any, any>[];
}
