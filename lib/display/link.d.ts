import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget, TProp } from "../interface/widget";
export declare function linkAttrs(fieldType: string, value: TProp): {
    href: string;
    class: string;
    target?: undefined;
} | {
    href: string | number | boolean;
    target: string;
    class: string;
};
export declare const iconMap: Record<string, string>;
export declare class Link implements ClassComponent<IPropWidget> {
    view({ attrs: { field, value } }: CVnode<IPropWidget>): m.Vnode<any, any>;
}
