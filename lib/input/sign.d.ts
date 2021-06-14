import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";
import { IFile, IFileWidget } from "../interface/widget";
export declare function setFile(fileList: stream<IFile[]>, id: string, maxSize: number): (setDataUrl: string) => Promise<void>;
export declare class SignBuilder implements ClassComponent<IFileWidget> {
    private signType?;
    private valUpdate;
    oninit({ attrs: { value } }: CVnode<IFileWidget>): void;
    onremove(): void;
    view({ attrs: { field, value } }: CVnode<IFileWidget>): m.Vnode<any, any>;
    private setSignType;
}
