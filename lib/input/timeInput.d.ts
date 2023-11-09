import m, { CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
import { ValidationBase } from "../validationBase";
export declare class TimeInput extends ValidationBase<IPropWidget> {
    private showPicker;
    private readonly hour;
    private readonly cleanHour;
    private readonly min;
    private readonly cleanMin;
    private readonly time;
    oninit({ attrs: { value } }: CVnode<IPropWidget>): void;
    onbeforeupdate({ attrs: { value } }: CVnode<IPropWidget>): void;
    onremove(): void;
    view({ attrs }: CVnode<IPropWidget>): m.Vnode<import("../interface/widget").IPropLayoutWidget<import("../interface/widget").IField>, unknown>;
}
