import { Children, ClassComponent, CVnode } from "mithril";
import { Stream } from "mithril/stream";
import { IFile, IFileWidget } from "../interface/widget";
export declare class ImageMulti implements ClassComponent<IFileWidget> {
    protected static maxImageSize: number;
    protected dragging: Stream<boolean>;
    view({ attrs: { field, value } }: CVnode<IFileWidget>): Children;
}
export declare function addFiles(fileList: Stream<IFile[]>, maxSize: number): (addList: FileList | null) => void;
