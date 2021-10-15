import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class DateInput implements ClassComponent<IPropWidget> {
    private day;
    private month;
    private year;
    private date;
    private valid;
    private buildDate;
    private updateInputs;
    private dateInputAdvanceOrder;
    private dom;
    private focusedInput;
    private dateParts;
    private locale;
    private findNextInput;
    private findPrevInput;
    private setDateInputs;
    private setLocale;
    oninit({ attrs }: CVnode<IPropWidget>): void;
    oncreate({ dom }: CVnodeDOM<IPropWidget>): void;
    onbeforeupdate({ attrs: { field } }: CVnode<IPropWidget>): void;
    onupdate({ dom }: CVnodeDOM<IPropWidget>): void;
    onremove(): void;
    view({ attrs }: CVnode<IPropWidget>): m.Vnode<IPropWidget, unknown>;
}
