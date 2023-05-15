import { ComponentTypes } from "mithril";
import { ListController } from "../list/listController";
export interface IList<T> {
    /** Classes for scrollable list container */
    readonly classes?: string;
    /** Component for list item */
    readonly component: ComponentTypes<T>;
    /** List data source */
    readonly controller: ListController<T>;
}
export interface IListPageRender<T> {
    readonly idx: number;
    readonly items: ReadonlyArray<T>;
    readonly visible: boolean;
}
export interface IListPage<T> extends IListPageRender<T> {
    readonly component: ComponentTypes<T>;
}
