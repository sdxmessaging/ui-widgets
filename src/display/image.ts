import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IFileWidget } from "../interface/widget";

import { getDisplayLabel } from "../utils";
import { Thumbnail } from "./thumbnail";

export class ImageList implements ClassComponent<IFileWidget> {

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {
		const { classes, style } = field;
		return m(".pa2.flex.flex-column.bb.b--black-20", {
			class: classes,
			style
		}, [
				getDisplayLabel(field, "mb2"),
				m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",
					lodash.map(value(), ({ name, path }) => m(Thumbnail, {
						title: name,
						src: path,
						style: { "max-height": "6rem" }
					}))
				)
			]
		);
	}

}
