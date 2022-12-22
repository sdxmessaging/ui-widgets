import { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";
import { IFile, IFileWidget } from "../interface/widget";
export declare function addOmniFiles(fileList: stream<IFile[]>, replace: boolean): (addList: FileList | null) => Promise<void>;
export declare class OmniFileInput implements ClassComponent<IFileWidget> {
    protected readonly dragging: stream<boolean>;
    view({ attrs }: CVnode<IFileWidget>): Children;
    private innerComponent;
}
