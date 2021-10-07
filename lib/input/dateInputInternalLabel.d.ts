import { CVnode } from "mithril";
import { IPropWidget } from "..";
import { InputInternalLabel } from "./inputInternalLabel";
export declare class ViewInputOverride extends InputInternalLabel {
    selected: boolean;
    protected viewInput({ attrs: { children } }: CVnode<IPropWidget>): import("mithril").Children;
}
