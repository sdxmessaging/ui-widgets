import m, { ClassComponent, CVnode } from "mithril";
import { ICheckboxField, IPropWidget } from "../interface/widget";
import { IConfig, TIcon, TSubset } from "../interface/config";
type TCheckboxWidget = IPropWidget<ICheckboxField>;
export declare class Checkbox implements ClassComponent<TCheckboxWidget> {
    protected readonly onIcon: keyof TSubset<IConfig, TIcon>;
    protected readonly offIcon: keyof TSubset<IConfig, TIcon>;
    view({ attrs: { field, value } }: CVnode<TCheckboxWidget>): m.Vnode<any, any>;
}
export {};
