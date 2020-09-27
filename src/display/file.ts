import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IFileWidget } from "../interface/widget";

import { config } from "../config";
import { classMap, getIcon, txtCls } from "../theme";
import { getDisplayLabel } from "../utils";

export class FileList implements ClassComponent<IFileWidget> {

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {
		const { label, classes = "", style } = field;
		return m(".pa2.flex.flex-column", {
			class: `${classMap.dspBrd()} ${classes}`,
			style
		}, [
			getDisplayLabel(label),
			m(".flex.flex-column.mt1.nb1", lodash.map(value(), ({ name, path }) => {
				return m(".ba.b--black-20.pointer[target=_blank]", {
					class: txtCls()
				}, [
					m("a.pa2.mv1.link.b--black-20.dim.pointer[target=_blank].dib ", {},
						m("i.mr2", {
							href: path,
							class: getIcon(config.downloadIcn)
						}),
						name
					),
					m(".fr.dark-red.pointer.dim.dib.pt3.mr2", {
						class: getIcon(config.cancelIcn),
						onclick: function() {
							console.log(value());
							value([]);
						}
					},),
				]);
			})), 

		]);
	}

}
