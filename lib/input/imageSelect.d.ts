import { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";
import { IFile, IFileWidget } from "../interface/widget";
export declare class ImageSelect implements ClassComponent<IFileWidget> {
    protected static maxImageSize: number;
    protected dragging: stream<boolean>;
    view({ attrs: { field, value } }: CVnode<IFileWidget>): Children;
}
export declare function setFile(fileList: stream<IFile[]>, maxSize: number): (setList: FileList | null) => void;
