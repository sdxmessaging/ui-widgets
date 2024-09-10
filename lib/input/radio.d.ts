import m, { CVnode } from "mithril";
import { IPropWidget, IRadioField } from "../interface/widget";
import { BaseWidget } from "../baseWidget";
type TRadioWidget = IPropWidget<IRadioField>;
export declare class RadioInput extends BaseWidget<TRadioWidget> {
    view({ attrs }: CVnode<TRadioWidget>): m.Vnode<any, any>;
}
export {};
