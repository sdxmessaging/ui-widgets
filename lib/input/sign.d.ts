import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";
import { IFile, IFileWidget } from "../interface/widget";
export declare const enum SignState {
    Select = 0,
    Draw = 1,
    Type = 2
}
export declare class SignBuilder implements ClassComponent<IFileWidget> {
    protected static maxImageSize: number;
    private state;
    view({ attrs: { field, value } }: CVnode<IFileWidget>): m.Vnode<any, any>;
}
export declare function setFile(fileList: stream<IFile[]>, state: stream<SignState>, id: string, maxSize: number): (setDataUrl: string) => Promise<void>;
