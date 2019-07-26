import m, { ClassComponent, CVnode } from "mithril";
import { Stream } from "mithril/stream";
import { IFile, IFileWidget } from "../interface/widget";
export declare class FileSelect implements ClassComponent<IFileWidget> {
    protected dragging: Stream<boolean>;
    view({ attrs: { field, value } }: CVnode<IFileWidget>): m.Vnode<import("./fileInput").IFileInput, unknown>;
}
export declare function setFile(fileList: Stream<IFile[]>): (setList: FileList | null) => void;
