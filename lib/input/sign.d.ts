import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";
import { IFile, IFileWidget, ISignField, TPropMap } from "../interface/widget";
export declare function setFile(fileList: stream<IFile[]>, id: string, maxSize: number): (setDataUrl: string, metadata?: TPropMap) => Promise<void>;
declare type TSignWidget = IFileWidget<ISignField>;
export declare class SignBuilder implements ClassComponent<TSignWidget> {
    private signType?;
    private valUpdate;
    oninit({ attrs: { value } }: CVnode<TSignWidget>): void;
    onremove(): void;
    view({ attrs: { field, value } }: CVnode<TSignWidget>): m.Vnode<any, any>;
    private setSignType;
}
export {};
