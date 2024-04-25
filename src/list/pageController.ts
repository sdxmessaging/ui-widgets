import m from "mithril";
import { ListController } from "./listController";
import { IListPageRender } from "../interface/list";

export class PageController<T> extends ListController<T> {

	/** Default size of a "page" in "blocks" */
	private static readonly PAGE_STRIDE = 4;

	static override single<D>(load: () => Promise<D[]>) {
		const ctrl = new PageController<D>(
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
		const loadSize = ListController.BLOCK_SIZE * 4;
		const ctrl = new PageController<D>(
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

	private pageStride = PageController.PAGE_STRIDE;

	/** Update the number of "blocks" to render in a single page */
	public set blockStride(value: number) {
		this.pageStride = value;
		this.updatePage(0);
	}

	/** Zero-indexed page number */
	private page = 0;
	/** Zero-indexed page update */
	private updatePage(page: number) {
		// Clamp page and start block from page
		this.page = ListController.clampRange(0, page, this.lastPage);
		this.startBlock = this.page * this.pageStride;
		// Could consider clamping end block, but it's not necessary
		this.endBlock = this.startBlock + this.pageStride;
		this.ensureBlockStore();
		m.redraw();
	}

	/** 1-indexed page number */
	public get currentPage() {
		return this.page + 1;
	}
	/** Number of pages to fit loaded list items */
	public get lastPage() {
		return Math.ceil(this.availableBlocks / this.pageStride);
	}
	public get canPageForward() {
		return !this.loading && this.currentPage < this.lastPage;
	}
	public get canPageBackward() {
		return !this.loading && this.page > 0;
	}
	public get rowsPerPage() {
		return this.pageStride * ListController.BLOCK_SIZE;
	}

	/** Set page */
	public setPage(page: number) {
		this.updatePage(page - 1);
	}
	/** Change page relative to current page */
	public pageRelative(offset: number) {
		this.updatePage(this.page + offset);
	}

	public override render<C>(callback: (params: IListPageRender<T>) => C): C[] {
		return this.blockStore.slice(this.startBlock, this.endBlock).map((items, idx) => callback({
			items,
			idx,
			visible: true
		}));
	}

	public override debug() {
		return {
			...super.debug(),
			blockStride: this.pageStride,
			page: this.page
		};
	}

	/** Initialise page & ensure page range is available in blockStore */
	protected override updateBlockRange() {
		if (this.startBlock === -1) {
			this.updatePage(0);
		}
		if (this.endBlock >= this.blockStore.length) {
			this.ensureBlockStore();
		}
	}

}
