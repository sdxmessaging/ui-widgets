import m, { ClassComponent, CVnode } from "mithril";
import { Stream } from "mithril/stream";
import { IFileWidget } from "../interface/widget";
export declare class FileSelect implements ClassComponent<IFileWidget> {
    protected dragging: Stream<boolean>;
    view({ attrs: { field, value } }: CVnode<IFileWidget>): m.Vnode<any, any>;
}
