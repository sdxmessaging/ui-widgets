import { ComponentTypes } from "mithril";
import { ListController } from "../list/listController";

interface IKeyAttrs extends Record<string, unknown> {
	readonly key?: string | number;
}

export interface IList<T> {
	/** List data source */
	readonly controller: ListController<T>;
	/** Component for list item */
	readonly component: ComponentTypes<T>;
	/** Classes for scrollable list container */
	readonly classes?: string;
	/** Set mithril attributes for fragment wrapping each list item */
	fragment?(item: T): IKeyAttrs;
}

export interface IListPageRender<T> {
	readonly idx: number;
	readonly items: ReadonlyArray<T>;
	readonly visible: boolean;
}

export interface IListPage<T> extends IListPageRender<T> {
	readonly component: ComponentTypes<T>;
	fragment(item: T): IKeyAttrs;
}
