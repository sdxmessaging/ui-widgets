import { Children, ClassComponent, CVnode } from "mithril";
import { IDisplayWidget } from "../interface/widget";
export declare class DisplayTypeComponent implements ClassComponent<IDisplayWidget> {
    view({ attrs: { displayType, value } }: CVnode<IDisplayWidget>): Children;
}
