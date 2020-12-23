const o = require("ospec");

import m from "mithril";

import { categoryItem, itemListStream, modelList } from "../../../../test-data";
import { ModelType } from "../../../interface/vault";
import { homeCategory } from "../../../models/default";

import { ItemGrid } from "./itemGrid";

o.spec("ItemGrid", () => {

	o("basic", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(ItemGrid, {
				modelList,
				itemList: itemListStream,
				item: Object.assign({}, homeCategory, { type: ModelType.grid }),
				onUpload: () => Promise.reject()
			})
		});
		o(root.childNodes.length).equals(3);
	});

	o("category - all items", () => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(ItemGrid, {
				modelList,
				itemList: itemListStream,
				item: Object.assign({}, categoryItem, { content: [], type: ModelType.grid }),
				onUpload: () => Promise.reject()
			})
		});
		o(root.childNodes.length).equals(3);
	});

});
