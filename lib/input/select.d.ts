import m, { CVnode } from "mithril";
import { IOptionField, IPropWidget } from "../interface/widget";
import { ValidationBase } from "../validationBase";
type TSelectWidget = IPropWidget<IOptionField>;
export declare class SelectInput extends ValidationBase<TSelectWidget> {
    protected readonly selector = "select";
    view({ attrs }: CVnode<TSelectWidget>): m.Vnode<import("../interface/widget").IPropLayoutWidget<import("../interface/widget").IField>, unknown>;
}
export {};
