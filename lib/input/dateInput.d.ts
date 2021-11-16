import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class DateInput implements ClassComponent<IPropWidget> {
    private readonly day;
    private readonly month;
    private readonly year;
    private readonly date;
    private readonly valid;
    private readonly literalKey;
    private dateInputAdvanceOrder;
    private readonly dom;
    private readonly focusedInput;
    private dateParts;
    private readonly locale;
    private buildDate;
    private findNextInput;
    private findPrevInput;
    private setDateInputs;
    private setLocale;
    oninit({ attrs: { value, field } }: CVnode<IPropWidget>): void;
    oncreate({ dom }: CVnodeDOM<IPropWidget>): void;
    onbeforeupdate({ attrs: { field } }: CVnode<IPropWidget>): void;
    onupdate({ dom }: CVnodeDOM<IPropWidget>): void;
    onremove(): void;
    view({ attrs }: CVnode<IPropWidget>): m.Vnode<import("../interface/widget").IPropLayoutWidget, unknown>;
}
