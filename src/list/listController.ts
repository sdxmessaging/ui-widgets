import m from "mithril";
import { IListPageRender } from "../interface/list";

export class ListController<T> {

	private static readonly PAGE_SIZE = 25;
	private static readonly PAGE_RANGE = 3;

	/** Factory for a ListController that loads all data at once */
	static single<D>(load: () => Promise<D[]>): ListController<D> {
		const ctrl: ListController<D> = new ListController(
			() => load().then((rowData) => {
				ctrl.updateDataStore(rowData);
				m.redraw();
			})
		);
		return ctrl;
	}

	/** Factory for a ListController that loads data in pages */
	static paging<D>(load: (offset: number, limit: number) => Promise<D[]>): ListController<D> {
		const loadSize = ListController.PAGE_SIZE * 4;
		const ctrl: ListController<D> = new ListController(
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

	// All data, unsorted and unfiltered
	private readonly dataStore: T[] = [];
	// Rendered pages
	private readonly viewStore: ReadonlyArray<T>[] = [];
	// Pages of data yet to be rendered (this should be optimised out, viewStore can populate directly from dataStore)
	private readonly pageStore: ReadonlyArray<T>[] = [];

	private scrollPct = 0;
	private startPage = -1;
	private endPage = -1;

	private loadMore = false;
	public isLoading = false;
	public get loading() {
		return this.isLoading;
	}

	constructor(private dataLoader: (offset: number) => Promise<void>) {
		this.load();
	}

	public invalidate() {
		this.startPage = -1;
		this.endPage = -1;
		this.dataStore.splice(0, this.dataStore.length);
		this.viewStore.splice(0, this.viewStore.length);
		this.pageStore.splice(0, this.pageStore.length);
		this.load();
	}

	/** Update visible page range, trigger redraw if range has changed */
	public updateScroll(percentage: number) {
		this.scrollPct = percentage;
		this.updatePageRange();
	}

	public updateDataStore(data: T[], hasMore = false) {
		this.loadMore = hasMore;
		this.dataStore.push(...data);
		const pageIdx = this.viewStore.length + this.pageStore.length;
		let startIdx = pageIdx * ListController.PAGE_SIZE;
		// Split data into pages
		while (startIdx < this.dataStore.length) {
			const endIdx = startIdx + ListController.PAGE_SIZE;
			// What happens if the last page is not full?
			this.pageStore.push(this.dataStore.slice(startIdx, endIdx));
			startIdx = endIdx;
		}
		this.updatePageRange();
	}

	public render<C>(callback: (params: IListPageRender<T>) => C): C[] {
		return this.viewStore.map((items, idx) => callback({
			items,
			idx,
			visible: idx >= this.startPage && idx <= this.endPage
		}));
	}

	public debug() {
		return {
			rows: this.dataStore.length,
			activePages: this.viewStore.length,
			pendingPages: this.pageStore.length,
			start: this.startPage,
			end: this.endPage
		};
	}

	private load() {
		if (!this.loading) {
			this.isLoading = true;
			this.dataLoader(this.dataStore.length)
				.catch(console.error)
				.then(() => this.isLoading = false);
		}
	}

	private updatePageRange() {
		// Determine start page, minor bias to help different page sizes and scrolling up
		let startPage = Math.max(0, Math.floor(this.scrollPct * this.viewStore.length) - 1);
		// "Rewind" start page if it is too close to the end
		if (startPage + ListController.PAGE_RANGE > (this.viewStore.length + this.pageStore.length)) {
			startPage = Math.max(0, this.viewStore.length - ListController.PAGE_RANGE);
		}
		if (startPage !== this.startPage) {
			this.startPage = startPage;
			this.endPage = startPage + ListController.PAGE_RANGE;
			// Get more pages from pageStore if required
			if (this.endPage >= this.viewStore.length && this.pageStore.length > 0) {
				this.viewStore.push(...this.pageStore.splice(0, this.endPage - this.viewStore.length));
			}
			// Load more pages if required
			if (this.loadMore && this.pageStore.length === 0) {
				this.load();
			}
			m.redraw();
		}
	}

}
