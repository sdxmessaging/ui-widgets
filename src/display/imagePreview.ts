import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IFileWidget } from "../interface/widget";

import { getDisplayLabel, getIcon, imgMaxSize, imgSrc } from "../utils";

export class ImagePreview implements ClassComponent<IFileWidget> {

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {
		const { classes, style } = field;
		const file = lodash.head(value());
		return m(".pa2.flex.flex-column.bb.b--black-20", {
			class: classes,
			style
		}, [
				getDisplayLabel(field, "mb1"),
				file
					? m("img.img.contain.self-center", {
						title: file.name,
						src: imgSrc(file.path, file.dataUrl),
						style: imgMaxSize
					})
					: m("i", {
						class: getIcon("fa-image")
					})
			]
		);
	}

}
