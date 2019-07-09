import m, { ClassComponent, CVnode } from "mithril";
import { IFileWidget } from "../interface/widget";
export declare class ImagePreview implements ClassComponent<IFileWidget> {
    view({ attrs: { field, value } }: CVnode<IFileWidget>): m.Vnode<any, any>;
}
