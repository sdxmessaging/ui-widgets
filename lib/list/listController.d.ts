import { IListPageRender } from "../interface/list";
export declare class ListController<T> {
    private dataLoader;
    private static readonly PAGE_SIZE;
    private static readonly PAGE_RANGE;
    /** Clamp value to a range, min takes priority over max */
    private static clampRange;
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
    private readonly pageStore;
    private scrollPct;
    private startPage;
    private endPage;
    private loadMore;
    isLoading: boolean;
    get loading(): boolean;
    private bufferReload;
    setSort(sortFn: (inp: T[]) => T[]): void;
    applySort(): void;
    setFilter(filterFn: (inp: T[]) => T[]): void;
    applyFilter(): void;
    reload(): void;
    /** Update visible page range, trigger redraw if range has changed */
    updateScroll(percentage: number): void;
    updateDataStore(data: T[], hasMore?: boolean): void;
    render<C>(callback: (params: IListPageRender<T>) => C): C[];
    debug(): {
        data: number;
        filtered: number;
        pages: number;
        start: number;
        end: number;
    };
    private constructor();
    private invalidate;
    private load;
    private updatePageRange;
}
