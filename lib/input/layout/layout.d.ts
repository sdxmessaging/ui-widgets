import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../../interface/widget";
import { FloatLabel } from "./floatLabel";
export declare class Layout implements ClassComponent<IPropWidget> {
    protected layout: typeof FloatLabel;
    view({ attrs, children }: CVnode<IPropWidget>): m.Vnode<IPropWidget, unknown>;
}
