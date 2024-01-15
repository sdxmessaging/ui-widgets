import m, { CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
import { ValidationBase } from "../validationBase";
export declare class TimeInput extends ValidationBase<IPropWidget> {
    private showPicker;
    private focus;
    private readonly hour;
    private readonly cleanHour;
    private readonly padHour;
    private readonly min;
    private readonly cleanMin;
    private readonly padMin;
    private readonly time;
    /** Update hour/minute streams from value stream if changed */
    private syncTime;
    oninit({ attrs: { value } }: CVnode<IPropWidget>): void;
    onbeforeupdate({ attrs: { value } }: CVnode<IPropWidget>): void;
    onremove(): void;
    view({ attrs }: CVnode<IPropWidget>): m.Vnode<import("../interface/widget").IPropLayoutWidget<import("../interface/widget").IField>, unknown>;
}
