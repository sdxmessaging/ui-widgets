import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { IField, IPropWidget } from "../interface/widget";
export declare class DateInput implements ClassComponent<IPropWidget> {
    private readonly dom;
    private readonly valid;
    private readonly focusedInput;
    private dateParts;
    private readonly locale;
    private readonly literalKey;
    private dateInputAdvanceOrder;
    private readonly day;
    private readonly month;
    private readonly year;
    private readonly date;
    private valueChange;
    private buildDate;
    private findNextInput;
    private findPrevInput;
    private setDateInputs;
    private setLocale;
    private createDateInputs;
    private resetDateParts;
    oninit({ attrs: { value, field } }: CVnode<IPropWidget>): void;
    oncreate({ dom }: CVnodeDOM<IPropWidget>): void;
    onbeforeupdate({ attrs: { field } }: CVnode<IPropWidget>): void;
    onupdate({ dom }: CVnodeDOM<IPropWidget>): void;
    onremove(): void;
    view(vnode: CVnode<IPropWidget>): m.Vnode<import("../interface/widget").IPropLayoutWidget<IField>, unknown>;
}
