import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";
import { IFile, IFileWidget } from "../interface/widget";
export declare const enum SignState {
    Readonly = 0,
    Select = 1,
    Draw = 2,
    Type = 3
}
export declare function setFile(fileList: stream<IFile[]>, state: stream<SignState>, id: string, maxSize: number): (setDataUrl: string) => Promise<void>;
export declare class SignBuilder implements ClassComponent<IFileWidget> {
    protected static maxImageSize: number;
    private state;
    oninit({ attrs: { field: { readonly, disabled } } }: CVnode<IFileWidget>): void;
    view({ attrs: { field, value } }: CVnode<IFileWidget>): m.Vnode<any, any>;
}
