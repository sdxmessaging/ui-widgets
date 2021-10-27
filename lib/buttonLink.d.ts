import m, { ClassComponent, CVnode } from "mithril";
import { IButtonLink } from "./interface/widget";
export declare class ButtonLink implements ClassComponent<IButtonLink> {
    view({ attrs: { label, title, icon, rightIcon, href, rel, target, download, context, classes, style } }: CVnode<IButtonLink>): m.Vnode<any, any>;
}
