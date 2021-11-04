import { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";
import { IFileWidget } from "../interface/widget";
export declare class MultiOmniFileInput implements ClassComponent<IFileWidget> {
    protected readonly dragging: stream<boolean>;
    view({ attrs: { field, value, displayType, showDisplay } }: CVnode<IFileWidget>): Children;
}
