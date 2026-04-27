import m, { CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
import { BaseWidget } from "../baseWidget";
export declare class BaseInput extends BaseWidget<IPropWidget> {
    view({ attrs }: CVnode<IPropWidget>): m.Vnode<import("..").IPropLayoutWidget<import("..").IField>, unknown>;
}
