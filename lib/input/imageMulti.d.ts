import { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";
import { IFile, IFileWidget } from "../interface/widget";
export declare class ImageMulti implements ClassComponent<IFileWidget> {
    protected static maxImageSize: number;
    protected dragging: stream<boolean>;
    view({ attrs: { field, value } }: CVnode<IFileWidget>): Children;
}
export declare function addFiles(fileList: stream<IFile[]>, maxSize: number): (addList: FileList | null) => Promise<void>;
