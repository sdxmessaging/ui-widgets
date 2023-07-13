import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare function getYmd(date: Date): [string, string, string];
export declare class DatePicker implements ClassComponent<IPropWidget> {
    private flatpickr;
    private valueChange;
    oncreate({ dom, attrs: { field: { max, min }, value } }: CVnodeDOM<IPropWidget>): void;
    onremove(): void;
    view({ attrs: { field: { config } } }: CVnode<IPropWidget>): m.Children;
}
