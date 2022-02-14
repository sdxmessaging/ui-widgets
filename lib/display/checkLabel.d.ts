import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
interface ICheckLabel {
    left?: boolean;
}
export declare class CheckLabel implements ClassComponent<IPropWidget & ICheckLabel> {
    view({ attrs: { field, value, left } }: CVnode<IPropWidget & ICheckLabel>): m.Vnode<any, any> | null;
}
export {};
