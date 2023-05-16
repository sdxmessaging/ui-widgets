import m from "mithril";
import { IListPageRender } from "../interface/list";

export class ListController<T> {

	private static readonly PAGE_SIZE = 25;
	private static readonly PAGE_RANGE = 3;
	private static identity<T>(input: T[]): T[] {
		return input;
	}

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
	public get data(): ReadonlyArray<T> {
		return this.dataStore;
	}

	private sortFn: (inp: T[]) => T[] = ListController.identity;
	private sortedDataStore: T[] = this.dataStore;
	public get sortedData(): ReadonlyArray<T> {
		return this.sortedDataStore;
	}

	private filterFn: (inp: T[]) => T[] = ListController.identity;
	private filteredDataStore: T[] = this.sortedDataStore;
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

	constructor(private dataLoader: (offset: number) => Promise<void>) {
		this.load();
	}

	public setSort(sortFn: (inp: T[]) => T[]) {
		this.sortFn = sortFn;
	}

	public applySort() {
		this.sortedDataStore = this.sortFn(this.dataStore);
		this.applyFilter();
	}

	public setFilter(filterFn: (inp: T[]) => T[]) {
		this.filterFn = filterFn;
	}

	public applyFilter() {
		this.filteredDataStore = this.filterFn(this.sortedDataStore);
		this.invalidate();
		this.updatePageRange();
	}

	public reload() {
		this.dataStore.splice(0, this.dataStore.length);
		this.invalidate();
		this.load();
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
				.then(() => this.isLoading = false);
		}
	}

	private updatePageRange() {
		// Determine start page, minor bias to help different page sizes and scrolling up
		let startPage = Math.max(0, Math.floor(this.scrollPct * this.pageStore.length) - 1);
		// "Rewind" start page if it is too close to the end
		const lastPage = Math.ceil(this.filteredDataStore.length / ListController.PAGE_SIZE);
		if (startPage + ListController.PAGE_RANGE > lastPage) {
			startPage = Math.max(0, this.pageStore.length - ListController.PAGE_RANGE);
		}
		if (startPage !== this.startPage) {
			this.startPage = startPage;
			this.endPage = startPage + ListController.PAGE_RANGE;
			// Update viewStore with more pages if required
			const bufferStart = this.pageStore.length * ListController.PAGE_SIZE;
			const bufferEnd = this.endPage * ListController.PAGE_SIZE;
			for (let start = bufferStart; start < bufferEnd; start += ListController.PAGE_SIZE) {
				const end = start + ListController.PAGE_SIZE;
				// Skip page if out of bounds and more data to load
				if (!(end > this.filteredDataStore.length && this.loadMore)) {
					this.pageStore.push(this.filteredDataStore.slice(start, end));
				}
			}
			// Load more pages if required
			if (this.loadMore && bufferEnd >= this.dataStore.length) {
				this.load();
			}
			m.redraw();
		}
	}

}
