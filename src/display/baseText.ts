import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { theme, wrapperCls } from "../theme";
import { getDisplayLabel } from "../utils";

export class BaseText implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { label, uiClass = {}, style } = field;
		return m(".pa2.flex.flex-wrap", {
			class: wrapperCls(uiClass),
			style
		}, [
			getDisplayLabel(label),
			m("span.ws-normal", {
				title: value(),
				class: theme.displayValue
			}, value())
		]);
	}

}
