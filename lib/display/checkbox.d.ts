import m, { ClassComponent, CVnode } from "mithril";
import { ICheckboxField, IPropWidget } from "../interface/widget";
import { IConfig, TSubset } from "../interface/config";
declare type TCheckboxWidget = IPropWidget<ICheckboxField>;
export declare class Checkbox implements ClassComponent<TCheckboxWidget> {
    protected readonly onIcon: keyof TSubset<IConfig, string>;
    protected readonly offIcon: keyof TSubset<IConfig, string>;
    view({ attrs: { field, value } }: CVnode<TCheckboxWidget>): m.Vnode<any, any>;
}
export {};
