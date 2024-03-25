import lodash from "lodash";
import m from "mithril";
import { IListPageRender } from "../interface/list";

type TListFn<T> = (inp: ReadonlyArray<T>) => ReadonlyArray<T>;

export class ListController<T> {

	/** Number of items in each "block" */
	protected static readonly BLOCK_SIZE = 25;
	/** Number of "blocks" to render */
	private static readonly BLOCK_RANGE = 3;

	/** Clamp value to a range, min takes priority over max */
	protected static clampRange(min: number, value: number, max: number) {
		return Math.max(min, Math.min(value, max));
	}

	/** Factory for a ListController that loads all data at once */
	static single<D>(load: () => Promise<D[]>) {
		const ctrl = new ListController<D>(
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
	static paging<D>(load: (offset: number, limit: number) => Promise<D[]>) {
		const loadSize = ListController.BLOCK_SIZE * 4;
		const ctrl = new ListController<D>(
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

	/** Number of blocks that can be made from filtered data */
	protected get availableBlocks() {
		return Math.ceil(this.filteredDataStore.length / ListController.BLOCK_SIZE);
	}

	// Data split into "blocks"
	protected readonly blockStore: ReadonlyArray<T>[] = [];

	private scrollPct = 0;
	protected startBlock = -1;
	protected endBlock = -1;

	private loadMore = false;
	private isLoading = false;
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
		this.updateBlockRange();
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
			this.updateBlockRange();
		}
	}

	public updateDataStore(data: T[], hasMore = false) {
		this.loadMore = hasMore;
		this.dataStore.push(...data);
		this.updateBlockRange();
	}

	public render<C>(callback: (params: IListPageRender<T>) => C): C[] {
		return this.blockStore.map((items, idx) => callback({
			items,
			idx,
			visible: idx >= this.startBlock && idx < this.endBlock
		}));
	}

	public debug() {
		return {
			data: this.data.length,
			filtered: this.filteredData.length,
			blocks: this.blockStore.length,
			start: this.startBlock,
			end: this.endBlock
		};
	}

	protected constructor(private dataLoader: (offset: number) => Promise<void>) {
		this.load();
	}

	private invalidate() {
		this.startBlock = -1;
		this.endBlock = -1;
		this.blockStore.splice(0, this.blockStore.length);
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

	protected updateBlockRange() {
		const startBlock = ListController.clampRange(
			0,
			// Bias to help different block sizes and scrolling up
			Math.floor(this.scrollPct * this.blockStore.length) - 1,
			// Limit to last block - block range
			this.availableBlocks - ListController.BLOCK_RANGE
		);
		if (startBlock !== this.startBlock) {
			this.startBlock = startBlock;
			this.endBlock = startBlock + ListController.BLOCK_RANGE;
			this.ensureBlockStore();
			m.redraw();
		}
	}

	/** Ensure blockStore contains rows for the current block range, load more rows if required */
	protected ensureBlockStore() {
		// Create more blocks if required
		let bufferStart = this.blockStore.length * ListController.BLOCK_SIZE;
		// Limit block creation to available data
		const bufferEnd = Math.min(this.endBlock, this.availableBlocks) * ListController.BLOCK_SIZE;
		while (bufferStart < bufferEnd) {
			const end = bufferStart + ListController.BLOCK_SIZE;
			this.blockStore.push(this.filteredDataStore.slice(bufferStart, end));
			bufferStart = end;
		}
		// Load more blocks if required and next block will run out of buffer
		if (this.loadMore && bufferEnd >= this.dataStore.length) {
			this.load();
		}
	}

}
