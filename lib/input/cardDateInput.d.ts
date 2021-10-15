import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class CardDateInput implements ClassComponent<IPropWidget> {
    private month;
    private year;
    private date;
    private valid;
    private dom;
    private focusedInput;
    private buildDate;
    private updateInputs;
    oninit({ attrs: { value } }: CVnode<IPropWidget>): void;
    oncreate({ dom }: CVnodeDOM<IPropWidget>): void;
    onupdate({ dom }: CVnodeDOM<IPropWidget>): void;
    onremove(): void;
    view({ attrs }: CVnode<IPropWidget>): m.Vnode<IPropWidget, unknown>;
}
