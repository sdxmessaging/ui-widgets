import m from "mithril";
import { IFile, IModelField } from "../interface/widget";
import { FileMulti } from "./fileMulti";
export declare class FileSelect extends FileMulti {
    protected multiple: boolean;
    protected viewUploadWidget(_: IModelField): m.Vnode<any, any>;
    protected viewFileList(): null;
    protected addFiles(fileList: ArrayLike<File>): void;
    protected getFileId(): string;
    protected setFile(fileObj: IFile): void;
}
