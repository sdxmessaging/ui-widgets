import m from "mithril";
import { ListController } from "./listController";
import { IListPageRender } from "../interface/list";

export class PageController<T> extends ListController<T> {

	private static readonly PAGE_STRIDE = 4;

	static override single<D>(load: () => Promise<D[]>) {
		const ctrl = new PageController(
			() => load().then((rowData) => {
				ctrl.updateDataStore(rowData);
				// Sort and filter immediately
				ctrl.applySort();
				m.redraw();
			})
		);
		return ctrl;
	}

	/** Factory for a ListController that loads data in pages */
	static override paging<D>(load: (offset: number, limit: number) => Promise<D[]>) {
		const loadSize = ListController.PAGE_SIZE * 4;
		const ctrl = new PageController(
			(offset) => load(offset, loadSize + 1).then((rowData) => {
				if (rowData.length > loadSize) {
					ctrl.updateDataStore(rowData.slice(0, loadSize), true);
				} else {
					ctrl.updateDataStore(rowData);
				}
				m.redraw();
			})
		);
		return ctrl;
	}

	// TODO Support custom page sizes
	// TODO get number of pages available
	// TODO get current page

	// TODO Clamp upper bounds
	public setPage(page: number) {
		this.startPage = PageController.PAGE_STRIDE * page;
		this.updatePageRange();
	}

	// TODO Clamp upper bounds
	public pageRelative(offset: number) {
		this.startPage += PageController.PAGE_STRIDE * offset;
		this.updatePageRange();
	}

	public override render<C>(callback: (params: IListPageRender<T>) => C): C[] {
		return this.pageStore.slice(this.startPage, this.endPage).map((items, idx) => callback({
			items,
			idx,
			visible: true
		}));
	}

	protected override updatePageRange() {
		// Clamp start page
		this.startPage = Math.max(0, this.startPage);
		// TODO Clamp end page
		this.endPage = this.startPage + PageController.PAGE_STRIDE;
		this.ensurePageStore();
		m.redraw();
	}

}
