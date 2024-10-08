import m, { CVnode } from "mithril";
import { IOptionField, IPropWidget } from "../interface/widget";
import { IConfig, TIcon, TSubset } from "../interface/config";
import { BaseWidget } from "../baseWidget";
type TSelectWidget = IPropWidget<IOptionField>;
export declare class CheckList extends BaseWidget<TSelectWidget> {
    protected readonly onIcon: keyof TSubset<IConfig, TIcon>;
    protected readonly offIcon: keyof TSubset<IConfig, TIcon>;
    private selected;
    private open;
    private openTs;
    private _focusOption;
    private get focusOption();
    private set focusOption(value);
    private keySearch;
    private keyTs;
    private toggleOpen;
    private toggleSelection;
    private moveFocus;
    private findFocus;
    private keyNav;
    private placeHolder;
    /** Sync selection set with value stream */
    private syncSelection;
    oninit({ attrs: { value } }: CVnode<TSelectWidget>): void;
    onbeforeupdate({ attrs: { value } }: CVnode<TSelectWidget>): void;
    view({ attrs }: CVnode<TSelectWidget>): m.Vnode<import("../interface/widget").IPropLayoutWidget<import("../interface/widget").IField>, unknown>;
    private singleSelectionRow;
    private multiSelectionRow;
}
export {};
