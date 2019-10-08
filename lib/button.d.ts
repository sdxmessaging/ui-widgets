import m, { ClassComponent, CVnode } from "mithril";
interface IButton {
    readonly label?: string;
    readonly type?: "submit" | "reset" | "button";
    readonly icon?: string;
    readonly classes?: string;
    readonly disabled?: boolean;
    readonly style?: object;
    onclick?(): void;
}
export declare class Button implements ClassComponent<IButton> {
    view({ attrs: { label, type, icon, classes, disabled, style, onclick } }: CVnode<IButton>): m.Vnode<any, any>;
}
export {};
