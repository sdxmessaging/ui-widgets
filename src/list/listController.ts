import lodash from "lodash";
import m from "mithril";
import { IListPageRender } from "../interface/list";

type TListFn<T> = (inp: ReadonlyArray<T>) => ReadonlyArray<T>;

export class ListController<T> {

	private static readonly PAGE_SIZE = 25;
	private static readonly PAGE_RANGE = 3;

	/** Clamp value to a range, min takes priority over max */
	private static clampRange(min: number, value: number, max: number) {
		return Math.max(min, Math.min(value, max));
	}

	/** Factory for a ListController that loads all data at once */
	static single<D>(load: () => Promise<D[]>): ListController<D> {
		const ctrl: ListController<D> = new ListController(
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
	public get data(): ReadonlyArray<T> {
		return this.dataStore;
	}

	private sortFn: TListFn<T> = lodash.identity;
	private sortedDataStore: ReadonlyArray<T> = this.dataStore;
	public get sortedData(): ReadonlyArray<T> {
		return this.sortedDataStore;
	}

	private filterFn: TListFn<T> = lodash.identity;
	private filteredDataStore: ReadonlyArray<T> = this.sortedDataStore;
	public get filteredData(): ReadonlyArray<T> {
		return this.filteredDataStore;
	}

	// Data split into pages
	private readonly pageStore: ReadonlyArray<T>[] = [];

	private scrollPct = 0;
	private startPage = -1;
	private endPage = -1;

	private loadMore = false;
	public isLoading = false;
	public get loading() {
		return this.isLoading;
	}
	private bufferReload = false;

	public setSort(sortFn: TListFn<T>) {
		this.sortFn = sortFn;
	}

	public applySort() {
		this.sortedDataStore = this.sortFn(this.dataStore);
		this.applyFilter();
	}

	public setFilter(filterFn: TListFn<T>) {
		this.filterFn = filterFn;
	}

	public applyFilter() {
		this.filteredDataStore = this.filterFn(this.sortedDataStore);
		this.invalidate();
		this.updatePageRange();
	}

	public reload() {
		this.bufferReload = this.loading;
		if (!this.bufferReload) {
			this.dataStore.splice(0, this.dataStore.length);
			this.invalidate();
			this.load();
		}
	}

	/** Update visible page range, trigger redraw if range has changed */
	public updateScroll(percentage: number) {
		if (this.dataStore.length > 0) {
			this.scrollPct = percentage;
			this.updatePageRange();
		}
	}

	public updateDataStore(data: T[], hasMore = false) {
		this.loadMore = hasMore;
		this.dataStore.push(...data);
		this.updatePageRange();
	}

	public render<C>(callback: (params: IListPageRender<T>) => C): C[] {
		return this.pageStore.map((items, idx) => callback({
			items,
			idx,
			visible: idx >= this.startPage && idx <= this.endPage
		}));
	}

	public debug() {
		return {
			data: this.data.length,
			filtered: this.filteredData.length,
			pages: this.pageStore.length,
			start: this.startPage,
			end: this.endPage
		};
	}

	private constructor(private dataLoader: (offset: number) => Promise<void>) {
		this.load();
	}

	private invalidate() {
		this.startPage = -1;
		this.endPage = -1;
		this.pageStore.splice(0, this.pageStore.length);
	}

	private load() {
		if (!this.loading) {
			this.isLoading = true;
			this.dataLoader(this.data.length)
				.catch(console.error)
				.then(() => {
					this.isLoading = false;
					if (this.bufferReload) {
						this.reload();
					}
				});
		}
	}

	private updatePageRange() {
		const startPage = ListController.clampRange(
			0,
			// Bias to help different page sizes and scrolling up
			Math.floor(this.scrollPct * this.pageStore.length) - 1,
			// Limit to last page - page range
			Math.ceil(this.filteredDataStore.length / ListController.PAGE_SIZE) - ListController.PAGE_RANGE
		);
		if (startPage !== this.startPage) {
			this.startPage = startPage;
			this.endPage = startPage + ListController.PAGE_RANGE;
			// Create more pages if required
			let bufferStart = this.pageStore.length * ListController.PAGE_SIZE;
			const bufferEnd = this.endPage * ListController.PAGE_SIZE;
			while (bufferStart < bufferEnd) {
				const end = bufferStart + ListController.PAGE_SIZE;
				this.pageStore.push(this.filteredDataStore.slice(bufferStart, end));
				bufferStart = end;
			}
			// Load more pages if required and next page will run out of buffer
			if (this.loadMore && bufferEnd >= this.dataStore.length) {
				this.load();
			}
			m.redraw();
		}
	}

}
