import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class Trusted implements ClassComponent<IPropWidget> {
    view({ attrs: { value } }: CVnode<IPropWidget>): m.Vnode<any, any>;
}
