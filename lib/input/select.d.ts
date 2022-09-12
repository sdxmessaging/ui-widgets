import m, { ClassComponent, CVnode } from "mithril";
import { IOptionField, IPropWidget } from "../interface/widget";
declare type TSelectWidget = IPropWidget<IOptionField>;
export declare class SelectInput implements ClassComponent<TSelectWidget> {
    view({ attrs }: CVnode<TSelectWidget>): m.Vnode<import("../interface/widget").IPropLayoutWidget<import("../interface/widget").IField>, unknown>;
}
export {};
