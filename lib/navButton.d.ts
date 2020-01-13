import m, { ClassComponent, CVnode } from "mithril";
import { IMithrilEvent } from "./interface/widget";
interface INavButton {
    readonly label?: string;
    readonly title?: string;
    readonly icon?: string;
    readonly classes?: string;
    readonly disabled?: boolean;
    readonly style?: object;
    onclick?(evt: IMithrilEvent): void;
}
export declare class NavButton implements ClassComponent<INavButton> {
    view({ attrs: { label, title, icon, classes, disabled, style, onclick } }: CVnode<INavButton>): m.Vnode<any, any>;
}
export {};
