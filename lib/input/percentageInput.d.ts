import m, { CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
import { BaseWidget } from "../baseWidget";
export declare class PercentageInput extends BaseWidget<IPropWidget> {
    view({ attrs }: CVnode<IPropWidget>): m.Vnode<import("../interface/widget").IPropLayoutWidget<import("../interface/widget").IField>, unknown>;
}
