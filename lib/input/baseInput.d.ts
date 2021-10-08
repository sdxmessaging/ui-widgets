import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class BaseInput implements ClassComponent<IPropWidget> {
    view({ attrs }: CVnode<IPropWidget>): m.Vnode<any, any> | m.Vnode<IPropWidget, unknown>;
}
