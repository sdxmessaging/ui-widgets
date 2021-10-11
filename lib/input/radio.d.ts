import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class RadioInput implements ClassComponent<IPropWidget> {
    view({ attrs }: CVnode<IPropWidget>): m.Vnode<IPropWidget, unknown>;
}
