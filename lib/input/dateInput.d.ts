import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class DateInput implements ClassComponent<IPropWidget> {
    private day;
    private month;
    private year;
    private valid;
    private date;
    private dom;
    oninit({ attrs: { value } }: CVnode<IPropWidget>): void;
    oncreate({ dom }: CVnodeDOM<IPropWidget>): void;
    onremove(): void;
    view({ attrs }: CVnode<IPropWidget>): m.Vnode<IPropWidget, unknown>;
}
