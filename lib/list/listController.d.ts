import { IListPageRender } from "../interface/list";
export declare class ListController<T> {
    private dataLoader;
    private static readonly PAGE_SIZE;
    private static readonly PAGE_RANGE;
    /** Factory for a ListController that loads all data at once */
    static single<D>(load: () => Promise<D[]>): ListController<D>;
    /** Factory for a ListController that loads data in pages */
    static paging<D>(load: (offset: number, limit: number) => Promise<D[]>): ListController<D>;
    private readonly dataStore;
    private readonly pageStore;
    private scrollPct;
    private startPage;
    private endPage;
    private loadMore;
    isLoading: boolean;
    get loading(): boolean;
    constructor(dataLoader: (offset: number) => Promise<void>);
    invalidate(): void;
    /** Update visible page range, trigger redraw if range has changed */
    updateScroll(percentage: number): void;
    updateDataStore(data: T[], hasMore?: boolean): void;
    render<C>(callback: (params: IListPageRender<T>) => C): C[];
    debug(): {
        data: number;
        pages: number;
        start: number;
        end: number;
    };
    private load;
    private updatePageRange;
}
