import { Children, CVnode } from "mithril";
import { IGroupOptionField, IPropWidget } from "../interface/widget";
import { BaseWidget } from "../baseWidget";
import { IConfig, TIcon, TSubset } from "../interface/config";
type TSelectWidget = IPropWidget<IGroupOptionField>;
export declare class CheckListGroup extends BaseWidget<TSelectWidget> {
    private static flattenOpts;
    protected readonly onIcon: keyof TSubset<IConfig, TIcon>;
    protected readonly offIcon: keyof TSubset<IConfig, TIcon>;
    private opts;
    private list;
    private selected;
    private open;
    private openTs;
    private focusOption;
    private _focusOptionValue;
    private get focusOptionValue();
    private set focusOptionValue(value);
    private keySearch;
    private toggleOpen;
    /** Select group if all children are also selected */
    private selectGroup;
    private toggleSelection;
    private moveFocus;
    private applyFilter;
    private keyNav;
    private placeHolder;
    /** Sync selection set with value stream */
    private syncSelection;
    oninit({ attrs: { field: { groups }, value } }: CVnode<TSelectWidget>): void;
    onbeforeupdate({ attrs: { field: { groups }, value } }: CVnode<TSelectWidget>): void;
    view({ attrs }: CVnode<TSelectWidget>): Children;
    private multiSelectionRow;
}
export {};
