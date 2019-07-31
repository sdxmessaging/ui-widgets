import { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";
import { IFile, IFileWidget } from "../interface/widget";
export declare class FileSelect implements ClassComponent<IFileWidget> {
    protected dragging: stream<boolean>;
    view({ attrs: { field, value } }: CVnode<IFileWidget>): Children;
}
export declare function setFile(fileList: stream<IFile[]>): (setList: FileList | null) => void;
