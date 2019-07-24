import m, { ClassComponent, CVnode } from "mithril";
import { Stream } from "mithril/stream";
import { IFileWidget } from "../interface/widget";
export declare class ImageSelect implements ClassComponent<IFileWidget> {
    protected static maxImageSize: number;
    protected dragging: Stream<boolean>;
    view({ attrs: { field, value } }: CVnode<IFileWidget>): m.Vnode<any, any>;
}
