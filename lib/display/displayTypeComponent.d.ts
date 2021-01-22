import m, { ClassComponent, CVnode } from "mithril";
import { IDisplayWidget } from "../interface/widget";
export declare class DisplayTypeComponent implements ClassComponent<IDisplayWidget> {
    view({ attrs: { displayType, value } }: CVnode<IDisplayWidget>): m.Vnode<any, any>;
}
