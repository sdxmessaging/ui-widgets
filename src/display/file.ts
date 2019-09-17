import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IFileWidget } from "../interface/widget";

import { getIcon } from "../theme";
import { getDisplayLabel } from "../utils";

export class FileList implements ClassComponent<IFileWidget> {

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {
		const { classes, style } = field;
		return m(".pa2.flex.flex-column.bb.b--black-20", {
			class: classes,
			style
		}, [
				getDisplayLabel(field, "mb1"),
				m(".flex.flex-column.mt1.nb1",
					lodash.map(value(), ({ name, path }) => {
						return m("a.pa2.mv1.link.ba.b--black-20.dark-gray.dim.pointer[target=_blank]", {
							href: path
						}, [
								m("i.mr2", {
									class: getIcon("fa-file-download")
								}),
								name
							]);
					})
				)
			]
		);
	}

}
