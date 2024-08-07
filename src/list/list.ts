import lodash from "lodash";
import m, { CVnode, ClassComponent } from "mithril";
import { IList } from "../interface/list";
import { IMithrilEvent } from "../interface/widget";
import { ListController } from "./listController";
import { ListPage } from "./listPage";

export class List<T> implements ClassComponent<IList<T>> {

	private static fragment() { return {}; }

	private controller!: ListController<T>;

	private scrollHandler = lodash.throttle((target: HTMLElement) => {
		const scrollPct = (target.scrollTop / target.scrollHeight) || 0;
		this.controller.updateScroll(scrollPct);
	}, 50, { leading: false });

	public oninit({ attrs: { controller } }: CVnode<IList<T>>) {
		this.controller = controller;
	}

	public view({ attrs: {
		component, classes = "overflow-y-auto", fragment = List.fragment
	} }: CVnode<IList<T>>) {
		return m("div", {
			class: classes,
			onscroll: (event: Event & IMithrilEvent) => {
				event.redraw = false;
				this.scrollHandler(event.target as HTMLElement);
			}
		}, this.controller.render(
			({ items, idx, visible }) => m(ListPage<T>, {
				items, idx, visible, component, fragment
			})
		));
	}
}
