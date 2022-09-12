import m, { ClassComponent, CVnode } from "mithril";
import { IOptionField, IPropWidget } from "../interface/widget";
declare type TSelectWidget = IPropWidget<IOptionField>;
export declare class SelectText implements ClassComponent<TSelectWidget> {
    view({ attrs: { field, value } }: CVnode<TSelectWidget>): m.Vnode<any, any>;
}
export {};
