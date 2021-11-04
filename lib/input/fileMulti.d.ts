import { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";
import { IFile, IFileWidget } from "../interface/widget";
export declare function addFiles(fileList: stream<IFile[]>, replace?: boolean): (addList: FileList | null) => void;
export declare function removeFile(fileList: stream<IFile[]>, removeGuid: string): (event: Event) => void;
export declare class FileMulti implements ClassComponent<IFileWidget> {
    protected readonly dragging: stream<boolean>;
    view({ attrs: { field, value } }: CVnode<IFileWidget>): Children;
}
