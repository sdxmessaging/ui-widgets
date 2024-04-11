import { ListController } from "./listController";
import { IListPageRender } from "../interface/list";
export declare class PageController<T> extends ListController<T> {
    /** Size of a "page" in "blocks" */
    private static readonly PAGE_STRIDE;
    static single<D>(load: () => Promise<D[]>): PageController<D>;
    /** Factory for a ListController that loads data in pages */
    static paging<D>(load: (offset: number, limit: number) => Promise<D[]>): PageController<D>;
    /** Zero-indexed page number */
    private page;
    /** Zero-indexed last page available */
    private get pageCount();
    /** Zero-indexed page update */
    private updatePage;
    get canPageForward(): boolean;
    get canPageBackward(): boolean;
    get currentPage(): number;
    get lastPage(): number;
    /** Set page */
    setPage(page: number): void;
    /** Change page relative to current page */
    pageRelative(offset: number): void;
    render<C>(callback: (params: IListPageRender<T>) => C): C[];
    debug(): {
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
