import m, { CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
import { BaseWidget } from "../baseWidget";
export declare class PasswordInput extends BaseWidget<IPropWidget> {
    private showPassword;
    view({ attrs }: CVnode<IPropWidget>): m.Vnode<import("..").IPropLayoutWidget<import("..").IField>, unknown>;
}
