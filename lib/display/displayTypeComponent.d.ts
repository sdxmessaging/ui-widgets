import { Children, ClassComponent, CVnode } from "mithril";
import { IDisplayWidget } from "../interface/widget";
import stream from "mithril/stream";
export declare class DisplayTypeComponent implements ClassComponent<IDisplayWidget> {
    protected dragging: stream<boolean>;
    view({ attrs: { displayType, value } }: CVnode<IDisplayWidget>): Children;
}
