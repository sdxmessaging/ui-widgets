import m, { ClassComponent, CVnode } from "mithril";
import { FieldType, IPropWidget, TProp } from "../interface/widget";
import { IConfig } from "..";
export declare function linkAttrs(fieldType: FieldType | string, value: TProp): {
    href: string;
    class: string;
    target?: undefined;
} | {
    href: TProp;
    target: string;
    class: string;
};
/** @deprecated Use `linkIcon` method */
export declare const iconMap: Record<string, string>;
export declare function linkIcon(type: FieldType | string, override?: Partial<IConfig>): string;
export declare class Link implements ClassComponent<IPropWidget> {
    view({ attrs: { field, value } }: CVnode<IPropWidget>): m.Vnode<any, any>;
}
