import m, { CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
import { ValidationBase } from "../validationBase";
export declare class BaseInput extends ValidationBase {
    view({ attrs }: CVnode<IPropWidget>): m.Vnode<IPropWidget, unknown>;
}
