import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class HiddenDateInput implements ClassComponent<IPropWidget> {
    view({ attrs }: CVnode<IPropWidget>): m.Vnode<any, any>;
}
