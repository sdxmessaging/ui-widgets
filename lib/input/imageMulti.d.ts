import { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";
import { IFile, IFileWidget } from "../interface/widget";
export declare function addImages(fileList: stream<IFile[]>, maxSize: number, replace?: boolean): (addList: FileList | null) => Promise<void>;
export declare class ImageMulti implements ClassComponent<IFileWidget> {
    protected readonly dragging: stream<boolean>;
    view({ attrs: { field, value } }: CVnode<IFileWidget>): Children;
}
