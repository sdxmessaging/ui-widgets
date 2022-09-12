import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class DateText implements ClassComponent<IPropWidget> {
    private formatted;
    private formatter;
    oninit({ attrs: { value } }: CVnode<IPropWidget>): void;
    onremove(): void;
    view({ attrs: { field } }: CVnode<IPropWidget>): m.Vnode<IPropWidget<import("../interface/widget").IField>, unknown>;
}
