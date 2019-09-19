import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IFileWidget } from "../interface/widget";

import { classMap, getIcon, imgMaxSize } from "../theme";
import { getDisplayLabel, imgSrc } from "../utils";

export class ImagePreview implements ClassComponent<IFileWidget> {

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {
		const { classes = "", style } = field;
		const file = lodash.head(value());
		return m(".pa2.flex.flex-column", {
			class: `${classMap.dspBrd()} ${classes}`,
			style
		}, [
				getDisplayLabel(field),
				file
					? m("img.img.mt2.contain.self-center", {
						title: file.name,
						src: imgSrc(file.path, file.dataUrl),
						style: imgMaxSize
					})
					: m("i.mt2", {
						class: `${classMap.inpCol()} ${getIcon("fa-image")}`
					})
			]
		);
	}

}
