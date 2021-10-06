import m, { CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
import { InputInternalLabel } from "./inputInternalLabel";
export declare class BaseInputInternalLabel extends InputInternalLabel {
    protected viewInput({ attrs: { field, value } }: CVnode<IPropWidget>): m.Vnode<any, any>;
}
