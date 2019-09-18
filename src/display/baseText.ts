import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { txtCls } from "../theme";
import { getDisplayLabel } from "../utils";

export class BaseText implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { classes, style } = field;
		return m(".pa2.flex.flex-wrap.bb.b--black-20", {
			class: classes,
			style
		}, [
			getDisplayLabel(field),
			m("span.ws-normal", {
				title: value(),
				class: txtCls()
			}, value())
		]);
	}

}
