import m, { CVnode } from "mithril";
import { IConfig, TIcon, TSubset } from "../interface/config";
import { ICheckboxField, IPropWidget } from "../interface/widget";
import { BaseWidget } from "../baseWidget";
type TCheckboxWidget = IPropWidget<ICheckboxField>;
export declare class CheckboxInput extends BaseWidget<TCheckboxWidget> {
    protected readonly onIcon: keyof TSubset<IConfig, TIcon>;
    protected readonly offIcon: keyof TSubset<IConfig, TIcon>;
    view({ attrs: { field, value: val } }: CVnode<TCheckboxWidget>): m.Vnode<any, any>;
}
export {};
