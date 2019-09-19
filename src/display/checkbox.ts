import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { classMap, getIcon } from "../theme";
import { getDisplayLabel } from "../utils";

export class Checkbox implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { classes = "", style } = field;
		return m(".pa2.flex.flex-wrap", {
			class: `${classMap.dspBrd()} ${classes}`,
			style
		}, [
				getDisplayLabel(field),
				m("i.self-end", {
					class: `${classMap.inpCol()} ${getIcon(value() ? "fa-check" : "fa-times")}`
				})
			]);
	}

}
