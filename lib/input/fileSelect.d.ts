import { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";
import { IFileWidget } from "../interface/widget";
export declare class FileSelect implements ClassComponent<IFileWidget> {
    protected dragging: stream<boolean>;
    view({ attrs: { field, value } }: CVnode<IFileWidget>): Children;
}
