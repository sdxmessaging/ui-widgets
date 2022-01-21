import m, { ClassComponent, CVnode } from "mithril";

import { IThumbnailArgs } from "../interface/widget";

import { getFileTypeIcon } from "../utils";

export class Thumbnail implements ClassComponent<IThumbnailArgs> {

	public view({ children, attrs }: CVnode<IThumbnailArgs>) {
		return m(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",
			{
				tabindex: 0,
				// Click contained button if present
				onkeydown: ({ key }: KeyboardEvent) => {
					if (key === "Enter" && document.activeElement) {
						document.activeElement.querySelector("button")?.click();
					}
				}
			}, [
			attrs.src && attrs.src !== "not_set" ? m("img.contain", { src: attrs.src }) : null,
			attrs.data && attrs.data.file && (attrs.src === "not_set" || !attrs.src) ? (
				m("div.contain.tc.br5.6rem", {
					class: `${getFileTypeIcon(attrs.data)} fa-2x`,
					tooltip: attrs.data.file.type
				})
			) : null,
			children
		]);
	}
}
