import m, { Child, ClassComponent, CVnode } from "mithril";
import { IConfig } from "../../interface/config";
interface ISelectionInner {
    readonly selected: boolean;
    readonly label: Child;
    readonly onIcon: string;
    readonly offIcon: string;
    readonly config?: Partial<IConfig>;
}
export declare class SelectionInner implements ClassComponent<ISelectionInner> {
    view({ attrs: { selected, label, onIcon, offIcon, config } }: CVnode<ISelectionInner>): m.Vnode<any, any>;
}
export {};
