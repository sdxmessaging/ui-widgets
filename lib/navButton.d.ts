import m, { ClassComponent, CVnode } from "mithril";
import { IButton } from "./button";
export declare class NavButton implements ClassComponent<IButton> {
    view({ attrs: { label, title, icon, classes, disabled, style, onclick } }: CVnode<IButton>): m.Vnode<any, any>;
}
