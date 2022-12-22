import m, { ClassComponent, CVnode } from "mithril";
import { IOptionField, IPropWidget } from "../interface/widget";
type TSelectWidget = IPropWidget<IOptionField>;
export declare class SelectText implements ClassComponent<TSelectWidget> {
    view({ attrs: { field, value } }: CVnode<TSelectWidget>): m.Vnode<any, any>;
}
export {};
