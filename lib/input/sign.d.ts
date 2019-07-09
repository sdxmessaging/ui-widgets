import { Children, CVnode } from "mithril";
import { IFileWidget } from "../interface/widget";
import { FileSelect } from "./fileSelect";
export declare class SignBuilder extends FileSelect {
    protected static maxImageSize: number;
    private state;
    view({ attrs: { field } }: CVnode<IFileWidget>): Children;
    private setDataUrl;
}
