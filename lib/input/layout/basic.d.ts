import m, { ClassComponent, CVnode } from "mithril";
import { IPropLayoutWidget } from "../../interface/widget";
export declare class Basic implements ClassComponent<IPropLayoutWidget> {
    view({ attrs, children }: CVnode<IPropLayoutWidget>): m.Vnode<any, any>;
}
