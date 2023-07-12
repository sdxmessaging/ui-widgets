import m, { Child, ClassComponent, CVnode } from "mithril";
import { IConfig, TIcon } from "../../interface/config";
interface ISelectionInner {
    readonly selected: boolean;
    readonly label?: Child;
    readonly onIcon: TIcon;
    readonly offIcon: TIcon;
    readonly config?: Partial<IConfig>;
}
export declare class SelectionInner implements ClassComponent<ISelectionInner> {
    view({ attrs: { selected, label, onIcon, offIcon, config } }: CVnode<ISelectionInner>): m.Vnode<any, any>;
}
export {};
