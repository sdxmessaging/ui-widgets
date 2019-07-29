import { Children, ClassComponent, CVnode } from "mithril";
import { Stream } from "mithril/stream";
import { IFile, IFileWidget } from "../interface/widget";
export declare class FileMulti implements ClassComponent<IFileWidget> {
    protected dragging: Stream<boolean>;
    view({ attrs: { field, value } }: CVnode<IFileWidget>): Children;
}
export declare function addFiles(fileList: Stream<IFile[]>): (addList: FileList | null) => void;
export declare function removeFile(fileList: Stream<IFile[]>, removeGuid: string): () => void;
