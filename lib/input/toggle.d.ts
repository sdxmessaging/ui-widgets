import m, { ClassComponent, CVnode } from "mithril";
import { IConfig, TIcon, TSubset } from "../interface/config";
import { ICheckboxField, IPropWidget } from "../interface/widget";
type TCheckboxWidget = IPropWidget<ICheckboxField>;
export declare class ToggleInput implements ClassComponent<TCheckboxWidget> {
    protected readonly onIcon: keyof TSubset<IConfig, TIcon>;
    protected readonly offIcon: keyof TSubset<IConfig, TIcon>;
    private toggleWrapper;
    private toggleInner;
    view({ attrs: { field, value: val } }: CVnode<TCheckboxWidget>): m.Vnode<any, any> | m.Vnode<import("../interface/widget").IPropLayoutWidget<import("../interface/widget").IField>, unknown>;
}
export {};
