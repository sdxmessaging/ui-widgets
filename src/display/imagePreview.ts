import lodash from "lodash";
declare const b: TBss;
import m, { ClassComponent, CVnode } from "mithril";

import { TBss } from "../interface/style";
import { IFileWidget } from "../interface/widget";

import { getDisplayLabel } from "../utils";

export class ImagePreview implements ClassComponent<IFileWidget> {

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {
		const { classes, style } = field;
		const file = lodash.head(value());
		return m(".pa2.flex.flex-column.bb.b--black-20", {
			class: classes,
			style
		}, [
				getDisplayLabel(field, "mb1"),
				file ? m("img.img.contain.self-center" + b.imgHeight, {
					title: file.name,
					src: file.path
				}) : m("i.fal.fa-image")
			]
		);
	}

}
