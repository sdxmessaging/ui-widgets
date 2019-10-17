import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IFileWidget } from "../interface/widget";

import { config } from "../config";
import { classMap, getIcon, txtCls } from "../theme";
import { getDisplayLabel } from "../utils";

export class FileList implements ClassComponent<IFileWidget> {

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {
		const { classes = "", style } = field;
		return m(".pa2.flex.flex-column", {
			class: `${classMap.dspBrd()} ${classes}`,
			style
		}, [
				getDisplayLabel(field),
				m(".flex.flex-column.mt1.nb1",
					lodash.map(value(), ({ name, path }) => {
						return m("a.pa2.mv1.link.ba.b--black-20.dim.pointer[target=_blank]", {
							href: path,
							class: txtCls()
						}, [
								m("i.mr2", {
									class: getIcon(config.downloadIcn)
								}),
								name
							]);
					})
				)
			]
		);
	}

}
