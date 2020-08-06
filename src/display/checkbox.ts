import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { config } from "../config";
import { classMap, getIcon } from "../theme";
import { getDisplayLabel } from "../utils";

export class Checkbox implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { label, classes = "", style } = field;
		return m(".pa2.flex.items-center", {
			class: `${classMap.dspBrd()} ${classes}`,
			style
		}, [
				getDisplayLabel(label),
				m("i", {
					class: `${classMap.inpCol()} ${getIcon(value() ? config.checkIcn : config.uncheckIcn)}`
				})
			]);
	}

}
