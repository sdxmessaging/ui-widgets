import m, { ClassComponent, CVnode } from "mithril";
import { IConfig, TSubset } from "../interface/config";
import { ICheckboxField, IPropWidget } from "../interface/widget";
declare type TCheckboxWidget = IPropWidget<ICheckboxField>;
export declare class CheckboxInput implements ClassComponent<TCheckboxWidget> {
    protected readonly onIcon: keyof TSubset<IConfig, string>;
    protected readonly offIcon: keyof TSubset<IConfig, string>;
    view({ attrs: { field, value: val } }: CVnode<TCheckboxWidget>): m.Vnode<any, any>;
}
export {};
