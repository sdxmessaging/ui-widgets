import m, { ClassComponent, CVnode } from "mithril";
import { Stream } from "mithril/stream";
import { IFile, IFileWidget } from "../interface/widget";
export declare class ImageSelect implements ClassComponent<IFileWidget> {
    protected static maxImageSize: number;
    protected dragging: Stream<boolean>;
    view({ attrs: { field, value } }: CVnode<IFileWidget>): m.Vnode<import("./fileInput").IFileInput, unknown>;
}
export declare function setFile(fileList: Stream<IFile[]>, maxSize: number): (setList: FileList | null) => void;
