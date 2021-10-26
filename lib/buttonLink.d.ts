import m, { ClassComponent, CVnode } from "mithril";
export interface IButtonLink {
    readonly label?: string;
    readonly title?: string;
    readonly icon?: string;
    readonly rightIcon?: string;
    readonly href?: string;
    readonly rel?: string;
    readonly target?: "_self" | "_blank" | "_parent" | "_top";
    readonly download?: string;
    readonly classes?: string;
    readonly context?: string;
}
export declare class ButtonLink implements ClassComponent<IButtonLink> {
    view({ attrs: { label, title, icon, rightIcon, href, rel, target, download, context, classes } }: CVnode<IButtonLink>): m.Vnode<any, any>;
}
