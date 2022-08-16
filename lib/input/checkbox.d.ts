import m, { ClassComponent, CVnode } from "mithril";
import { IConfig, TSubset } from "../interface/config";
import { IPropWidget } from "../interface/widget";
export declare class CheckboxInput implements ClassComponent<IPropWidget> {
    protected readonly onIcon: keyof TSubset<IConfig, string>;
    protected readonly offIcon: keyof TSubset<IConfig, string>;
    view({ attrs: { field, value: val } }: CVnode<IPropWidget>): m.Vnode<any, any>;
}
