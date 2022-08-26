import m, { ClassComponent, CVnode } from "mithril";
import { IOption, TProp } from "../interface/widget";
interface ICheckLabel {
    value: TProp;
    doubleLabel: boolean;
    options?: IOption[];
    left: boolean;
}
export declare class CheckLabel implements ClassComponent<ICheckLabel> {
    view({ attrs: { value, doubleLabel, options, left } }: CVnode<ICheckLabel>): m.Vnode<any, any> | null;
}
export {};
