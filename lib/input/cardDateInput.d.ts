import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class CardDateInput implements ClassComponent<IPropWidget> {
    private readonly dom;
    private readonly valid;
    private readonly focusedInput;
    private readonly month;
    private readonly year;
    private readonly date;
    private buildDate;
    oninit({ attrs: { value, field } }: CVnode<IPropWidget>): void;
    oncreate({ dom }: CVnodeDOM<IPropWidget>): void;
    onupdate({ dom }: CVnodeDOM<IPropWidget>): void;
    onremove(): void;
    view({ attrs }: CVnode<IPropWidget>): m.Vnode<import("../interface/widget").IPropLayoutWidget, unknown>;
}
