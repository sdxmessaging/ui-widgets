import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { classMap, txtCls } from "../theme";
import { getDisplayLabel } from "../utils";

export class BaseText implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { label, classes = "", style } = field;
		return m(".pa2.flex.flex-wrap", {
			class: `${classMap.dspBrd()} ${classes}`,
			style
		}, [
			getDisplayLabel(label),
			m("span.ws-normal", {
				title: value(),
				class: txtCls()
			}, value())
		]);
	}

}
