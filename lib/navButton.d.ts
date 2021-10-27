import m, { ClassComponent, CVnode } from "mithril";
import { IButton } from "./interface/widget";
export declare class NavButton implements ClassComponent<IButton> {
    view({ attrs: { label, title, icon, rightIcon, classes, style, disabled, onclick } }: CVnode<IButton>): m.Vnode<any, any>;
}
