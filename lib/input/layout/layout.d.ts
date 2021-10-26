import m, { ClassComponent, CVnode } from "mithril";
import { IPropLayoutWidget } from "../../interface/widget";
import { FloatLabel } from "./floatLabel";
export declare class Layout implements ClassComponent<IPropLayoutWidget> {
    protected layout: typeof FloatLabel;
    view({ attrs, children }: CVnode<IPropLayoutWidget>): m.Vnode<IPropLayoutWidget, unknown>;
}
