import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
import { IConfig, TSubset } from "../interface/config";
export declare class Checkbox implements ClassComponent<IPropWidget> {
    protected readonly onIcon: keyof TSubset<IConfig, string>;
    protected readonly offIcon: keyof TSubset<IConfig, string>;
    view({ attrs: { field, value } }: CVnode<IPropWidget>): m.Vnode<any, any>;
}
