import { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";
import { IFile, IFileWidget } from "../interface/widget";
export declare function addOmniFile(fileList: stream<IFile[]>, replace?: boolean): (addList: FileList | null) => Promise<void>;
export declare class OmniFileInput implements ClassComponent<IFileWidget> {
    protected dragging: stream<boolean>;
    view({ attrs: { field, value } }: CVnode<IFileWidget>): Children;
}
