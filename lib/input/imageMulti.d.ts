import m from "mithril";
import { IModelField } from "../interface/widget";
import { FileMulti } from "./fileMulti";
export declare class ImageMulti extends FileMulti {
    protected static maxImageSize: number;
    protected acceptTypes: string;
    protected viewUploadWidget({ classes }: IModelField): m.Vnode<any, any>;
    protected viewFileList(): m.Vnode<any, any>;
    protected addFiles(fileList: ArrayLike<File>): void;
}
