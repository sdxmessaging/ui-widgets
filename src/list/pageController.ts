import m from "mithril";
import { ListController } from "./listController";
import { IListPageRender } from "../interface/list";

export class PageController<T> extends ListController<T> {

	/** Size of a "page" in "blocks" */
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

	private page = 0;

	public get canPageForward() {
		return !this.loading && this.page < this.pageCount;
	}
	public get canPageBackward() {
		return !this.loading && this.page > 0;
	}
	/** Maximum page available (zero-indexed) */
	public get pageCount() {
		return Math.floor(this.availableBlocks / PageController.PAGE_STRIDE);
	}

	/** Set page (zero-indexed) */
	public setPage(page: number) {
		// Clamp page and start block from page
		this.page = ListController.clampRange(0, page, this.pageCount);
		this.startBlock = this.page * PageController.PAGE_STRIDE;
		// Could consider clamping end block, but it's not necessary
		this.endBlock = this.startBlock + PageController.PAGE_STRIDE;
		this.ensureBlockStore();
		m.redraw();
	}

	/** Change page relative to current page */
	public pageRelative(offset: number) {
		this.setPage(this.page + offset);
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
			page: this.page
		};
	}

	/** Initialise page & ensure page range is available in blockStore */
	protected override updateBlockRange() {
		if (this.startBlock === -1) {
			this.setPage(0);
		}
		if (this.endBlock > this.blockStore.length) {
			this.ensureBlockStore();
		}
	}

}
