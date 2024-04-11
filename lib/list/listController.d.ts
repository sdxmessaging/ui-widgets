import { IListPageRender } from "../interface/list";
type TListFn<T> = (inp: ReadonlyArray<T>) => ReadonlyArray<T>;
export declare class ListController<T> {
    private dataLoader;
    /** Number of items in each "block" */
    protected static readonly BLOCK_SIZE = 25;
    /** Number of "blocks" to render */
    private static readonly BLOCK_RANGE;
    /** Clamp value to a range, min takes priority over max */
    protected static clampRange(min: number, value: number, max: number): number;
    /** Factory for a ListController that loads all data at once */
    static single<D>(load: () => Promise<D[]>): ListController<D>;
    /** Factory for a ListController that loads data in pages */
    static paging<D>(load: (offset: number, limit: number) => Promise<D[]>): ListController<D>;
    private readonly dataStore;
    get data(): ReadonlyArray<T>;
    private sortFn;
    private sortedDataStore;
    get sortedData(): ReadonlyArray<T>;
    private filterFn;
    private filteredDataStore;
    get filteredData(): ReadonlyArray<T>;
    /** Number of blocks that can be made from filtered data */
    protected get availableBlocks(): number;
    protected readonly blockStore: ReadonlyArray<T>[];
    private scrollPct;
    protected startBlock: number;
    protected endBlock: number;
    private loadMore;
    private isLoading;
    get loading(): boolean;
    private bufferReload;
    setSort(sortFn: TListFn<T>): void;
    applySort(): void;
    setFilter(filterFn: TListFn<T>): void;
    applyFilter(): void;
    reload(): void;
    /** Update visible page range, trigger redraw if range has changed */
    updateScroll(percentage: number): void;
    updateDataStore(data: T[], hasMore?: boolean): void;
    render<C>(callback: (params: IListPageRender<T>) => C): C[];
    debug(): {
        data: number;
        filtered: number;
        blocks: number;
        start: number;
        end: number;
    };
    protected constructor(dataLoader: (offset: number) => Promise<void>);
    private invalidate;
    private load;
    protected updateBlockRange(): void;
    /** Ensure blockStore contains rows for the current block range, load more rows if required */
    protected ensureBlockStore(): void;
}
export {};
