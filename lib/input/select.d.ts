import m, { CVnode } from "mithril";
import { IOptionField, IPropWidget } from "../interface/widget";
import { BaseWidget } from "../baseWidget";
type TSelectWidget = IPropWidget<IOptionField>;
export declare class SelectInput extends BaseWidget<TSelectWidget> {
    protected readonly selector = "select";
    view({ attrs }: CVnode<TSelectWidget>): m.Vnode<import("../interface/widget").IPropLayoutWidget<import("../interface/widget").IField>, unknown>;
}
export {};
