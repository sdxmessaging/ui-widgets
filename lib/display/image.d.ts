import m, { ClassComponent, CVnode } from "mithril";
import { IFileWidget } from "../interface/widget";
export declare class ImageList implements ClassComponent<IFileWidget> {
    view({ attrs: { field, value } }: CVnode<IFileWidget>): m.Vnode<any, any>;
}
