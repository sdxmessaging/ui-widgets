import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IFileWidget } from "../interface/widget";

import { config } from "../config";
import { theme } from "../theme";
import { getDisplayLabel } from "../utils";

export class FileList implements ClassComponent<IFileWidget> {

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {
		const { label, uiClass = {}, style } = field;
		const { wrapper = "" } = uiClass;
		return m(".pa2.flex.flex-column", {
			class: `${wrapper} ${theme.wrapper}`,
			style
		}, [
			getDisplayLabel(label),
			m(".flex.flex-column.mt1.nb1", lodash.map(value(), ({ name, path }) => {
				return m(".ba.b--black-20", {
					class: theme.displayValue
				}, [
					m("a.pa2.mv1.link.b--black-20.dim.dib.pointer[target=_blank]",
						m("i.mr2", {
							href: path,
							class: config.downloadIcn
						}),
						name
					)
				]);
			}))
		]);
	}

}
