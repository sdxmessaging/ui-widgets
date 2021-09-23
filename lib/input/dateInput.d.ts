import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class DateInput implements ClassComponent<IPropWidget> {
    private day;
    private month;
    private year;
    private typing;
    private valid;
    private date;
    private dom;
    oninit({ attrs: { value } }: CVnode<IPropWidget>): void;
    oncreate({ dom }: CVnodeDOM<IPropWidget>): void;
    onremove(): void;
    private autoAdvance;
    private getBooleans;
    private handleDateChange;
    view({ attrs: { field, value } }: CVnode<IPropWidget>): m.Vnode<any, any>;
}
