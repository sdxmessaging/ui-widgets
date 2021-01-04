import m, { ClassComponent, CVnode } from "mithril";
import { FieldType, IPropWidget, TProp } from "../interface/widget";
export declare function linkAttrs(fieldType: FieldType | string, value: TProp): {
    href: string;
    class: string | undefined;
    target?: undefined;
} | {
    href: TProp;
    target: string;
    class: string | undefined;
};
export declare const iconMap: Record<string, string>;
export declare class Link implements ClassComponent<IPropWidget> {
    view({ attrs: { field, value } }: CVnode<IPropWidget>): m.Vnode<any, any>;
}
