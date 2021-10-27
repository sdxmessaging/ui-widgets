import m, { ClassComponent, CVnode } from "mithril";
import { IButton } from "./interface/widget";
export declare class Button implements ClassComponent<IButton> {
    view({ attrs: { label, type, title, icon, rightIcon, context, classes, style, disabled, onclick } }: CVnode<IButton>): m.Vnode<any, any>;
}
