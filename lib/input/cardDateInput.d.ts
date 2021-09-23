import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class CardDateInput implements ClassComponent<IPropWidget> {
    private month;
    private year;
    private valid;
    private date;
    private dom;
    oninit({ attrs: { value } }: CVnode<IPropWidget>): void;
    oncreate({ dom }: CVnodeDOM<IPropWidget>): void;
    onremove(): void;
    view({ attrs: { field, value } }: CVnode<IPropWidget>): m.Vnode<any, any>;
}
