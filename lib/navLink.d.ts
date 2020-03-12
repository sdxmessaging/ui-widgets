import m, { ClassComponent, CVnode } from "mithril";
import { IButtonLink } from "./buttonLink";
export declare class NavLink implements ClassComponent<IButtonLink> {
    view({ attrs: { label, title, icon, href, rel, target, download, classes, style } }: CVnode<IButtonLink>): m.Vnode<any, any>;
}
