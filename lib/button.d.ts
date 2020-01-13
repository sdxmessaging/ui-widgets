import m, { ClassComponent, CVnode } from "mithril";
import { IMithrilEvent } from "./interface/widget";
interface IButton {
    readonly label?: string;
    readonly type?: "submit" | "reset" | "button";
    readonly title?: string;
    readonly icon?: string;
    readonly classes?: string;
    readonly disabled?: boolean;
    readonly style?: object;
    onclick?(evt: IMithrilEvent): void;
}
export declare class Button implements ClassComponent<IButton> {
    view({ attrs: { label, type, title, icon, classes, disabled, style, onclick } }: CVnode<IButton>): m.Vnode<any, any>;
}
export {};
