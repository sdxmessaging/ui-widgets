import { Children, ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class BaseText implements ClassComponent<IPropWidget> {
    view({ attrs: { field, value } }: CVnode<IPropWidget>): Children;
}
