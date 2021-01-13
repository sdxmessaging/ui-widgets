import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IFileWidget } from "../interface/widget";

import { config } from "../config";
import { theme, wrapperCls } from "../theme";
import { getDisplayLabel } from "../utils";

export class FileList implements ClassComponent<IFileWidget> {

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {
		const { label, uiClass = {}, style } = field;
		return m(".pa2.flex.flex-column", {
			class: wrapperCls(uiClass),
			style
		}, [
			getDisplayLabel(label),
			m(".flex.flex-column.mt1.nb1", lodash.map(value(), ({ name, path }) => {
				return m("a.pa2.mv1.link.ba.b--black-20.dim.dib.pointer[target=_blank]", {
					class: theme.displayValue,
					href: path
				},
					m("i.mr2", {
						class: config.downloadIcn
					}),
					name
				);
			}))
		]);
	}

}
