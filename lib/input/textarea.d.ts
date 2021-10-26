import m, { CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
import { ValidationBase } from "../validationBase";
export declare class TextareaInput extends ValidationBase {
    view({ attrs }: CVnode<IPropWidget>): m.Vnode<import("../interface/widget").IPropLayoutWidget, unknown>;
}
