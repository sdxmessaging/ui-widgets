import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class TextareaInput implements ClassComponent<IPropWidget> {
    view({ attrs: { field, value } }: CVnode<IPropWidget>): m.Vnode<any, any>[];
}
