import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";
import { wrapperCls } from "../theme";

import { getLabel } from "../utils";

export class Label implements ClassComponent<IPropWidget> {

	public view({ attrs: { field: {
		label = "", id, required, uiClass = {}
	} } }: CVnode<IPropWidget>) {
		return m("div", { class: wrapperCls(uiClass) },
			getLabel(id, uiClass, label, required)
		);
	}
}
