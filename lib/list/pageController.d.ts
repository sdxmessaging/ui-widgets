import { ListController } from "./listController";
import { IListPageRender } from "../interface/list";
export declare class PageController<T> extends ListController<T> {
    /** Default size of a "page" in "blocks" */
    private static readonly PAGE_STRIDE;
    static single<D>(load: () => Promise<D[]>): PageController<D>;
    /** Factory for a ListController that loads data in pages */
    static paging<D>(load: (offset: number, limit: number) => Promise<D[]>): PageController<D>;
    private pageStride;
    /** Update the number of "blocks" to render in a single page */
    set blockStride(value: number);
    /** Zero-indexed page number */
    private page;
    /** Zero-indexed page update */
    private updatePage;
    /** 1-indexed page number */
    get currentPage(): number;
    /** Number of pages to fit loaded list items */
    get lastPage(): number;
    get canPageForward(): boolean;
    get canPageBackward(): boolean;
    get rowsPerPage(): number;
    /** Set page */
    setPage(page: number): void;
    /** Change page relative to current page */
    pageRelative(offset: number): void;
    render<C>(callback: (params: IListPageRender<T>) => C): C[];
    debug(): {
        blockStride: number;
        page: number;
        data: number;
        filtered: number;
        blocks: number;
        start: number;
        end: number;
    };
    /** Initialise page & ensure page range is available in blockStore */
    protected updateBlockRange(): void;
}
