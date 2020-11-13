import m, { ClassComponent, CVnode } from "mithril";
import { TStyle } from "./interface/theme";
import { IMithrilEvent } from "./interface/widget";
export interface IButton {
    readonly label?: string;
    readonly type?: "submit" | "reset" | "button";
    readonly title?: string;
    readonly icon?: string;
    readonly rightIcon?: string;
    readonly context?: string;
    readonly classes?: string;
    readonly disabled?: boolean;
    readonly style?: TStyle;
    onclick?(evt: IMithrilEvent): void;
}
export declare class Button implements ClassComponent<IButton> {
    view({ attrs: { label, type, title, icon, rightIcon, context, classes, disabled, style, onclick } }: CVnode<IButton>): m.Vnode<any, any>;
}
