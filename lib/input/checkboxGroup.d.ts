import { Children, CVnode } from "mithril";
import { IGroupOptionField, IPropWidget } from "../interface/widget";
import { BaseWidget } from "../baseWidget";
import { IConfig, TIcon, TSubset } from "../interface/config";
type TSelectWidget = IPropWidget<IGroupOptionField>;
export declare class CheckboxGroup extends BaseWidget<TSelectWidget> {
    protected readonly onIcon: keyof TSubset<IConfig, TIcon>;
    protected readonly offIcon: keyof TSubset<IConfig, TIcon>;
    private opts;
    private list;
    private selected;
    private open;
    private openTs;
    private _focusOption;
    private get focusOption();
    private set focusOption(value);
    private keySearch;
    private toggleOpen;
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
