import lodash from "lodash";
declare const b: TBss;
import m, { ClassComponent, CVnode } from "mithril";

import { TBss } from "../interface/style";
import { IFileWidget } from "../interface/widget";

import { getDisplayLabel, getFileUrl } from "../utils";

export class ImagePreview implements ClassComponent<IFileWidget> {

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {
		const { classes, style } = field;
		const fileObj = lodash.head(value());
		return m(".pa2.flex.flex-column.bb.b--black-20", {
			class: classes,
			style
		}, [
				getDisplayLabel(field, "mb1"),
				fileObj ? m("img.img.contain.self-center" + b.imgHeight, {
					src: getFileUrl(fileObj)
				}) : m("i.fal.fa-image")
			]
		);
	}

}
