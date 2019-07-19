import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { getDisplayLabel, getIcon } from "../utils";

export class Checkbox implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { classes, style } = field;
		return m(".pa2.flex.flex-wrap.bb.b--black-20", {
			class: classes,
			style
		}, [
			getDisplayLabel(field),
			m("i.self-end", {
				class: getIcon(value() ? "fa-check" : "fa-times")
			})
		]);
	}

}
