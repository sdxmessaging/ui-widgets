import m, { CVnode, CVnodeDOM, ClassComponent, CommonAttributes } from "mithril";
import { IListPage } from "../interface/list";

export class ListPage<T> implements ClassComponent<IListPage<T>> {

	private container!: HTMLElement;

	public oncreate({ dom }: CVnodeDOM<IListPage<T>>) {
		this.container = dom as HTMLElement;
	}

	public onbeforeupdate(
		{ attrs: { visible } }: CVnode<IListPage<T>>,
		{ attrs: { visible: previous } }: CVnode<IListPage<T>>
	) {
		if (visible === previous) {
			// Let visible determine view
			return visible;
		} else {
			this.container.style.height = visible ? "auto"
				: this.container.getBoundingClientRect().height + "px";
			// Always allow view (render visible rows or remove hidden rows)
			return true;
		}
	}

	public view({ attrs: { items, idx, visible, component, fragment } }: CVnode<IListPage<T>>) {
		return m("div", {
			"data-idx": idx
		}, visible ? items.map(
			(item) => m.fragment(fragment(item), [
				m(component, item as T & CommonAttributes<T, unknown>)
			])
		) : null);
	}
}
