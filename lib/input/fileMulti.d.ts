import { Children, ClassComponent, CVnode } from "mithril";
import { Stream } from "mithril/stream";
import { IFile, IFileWidget, IModelField } from "../interface/widget";
export declare class FileMulti implements ClassComponent<IFileWidget> {
    protected acceptTypes: string;
    protected multiple: boolean;
    protected dragging: boolean;
    protected fileList: Stream<IFile[]>;
    oninit({ attrs: { value } }: CVnode<IFileWidget>): void;
    view({ attrs: { field } }: CVnode<IFileWidget>): Children;
    protected viewUploadWidget(_: IModelField): Children;
    protected viewFileList(): Children;
    protected addFiles(fileList: ArrayLike<File>): void;
    protected removeFile(fileId: string): void;
    protected dragStart(evt: DragEvent): void;
    protected dragStop(evt: DragEvent): void;
}
