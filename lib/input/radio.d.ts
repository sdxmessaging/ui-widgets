import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget, IRadioField } from "../interface/widget";
declare type TRadioWidget = IPropWidget<IRadioField>;
export declare class RadioInput implements ClassComponent<TRadioWidget> {
    view({ attrs }: CVnode<TRadioWidget>): m.Vnode<any, any>;
}
export {};
