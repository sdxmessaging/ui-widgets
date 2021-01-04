import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { theme } from "../theme";
import { getDisplayLabel } from "../utils";

export class BaseText implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { label, uiClass = {}, style } = field;
		const { wrapper = "" } = uiClass;
		return m(".pa2.flex.flex-wrap", {
			class: `${wrapper} ${theme.wrapper}`,
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
