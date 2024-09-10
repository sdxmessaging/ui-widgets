import m, { CVnode } from "mithril";
import { IPropWidget, ITextareaField } from "../interface/widget";
import { BaseWidget } from "../baseWidget";
export declare class TextareaInput extends BaseWidget<IPropWidget<ITextareaField>> {
    protected readonly selector = "textarea";
    view({ attrs }: CVnode<IPropWidget<ITextareaField>>): m.Vnode<import("../interface/widget").IPropLayoutWidget<import("../interface/widget").IField>, unknown>;
}
