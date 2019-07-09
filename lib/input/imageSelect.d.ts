import m from "mithril";
import { IModelField } from "../interface/widget";
import { FileSelect } from "./fileSelect";
export declare class ImageSelect extends FileSelect {
    protected static maxImageSize: number;
    protected multiple: boolean;
    protected acceptTypes: string;
    protected viewUploadWidget({ classes }: IModelField): m.Vnode<any, any>;
    protected addFiles(fileList: ArrayLike<File>): void;
}
