import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";
import { labelCls, wrapperCls } from "../theme";

import { getLabelText } from "../utils";

export class Label implements ClassComponent<IPropWidget> {

	public view({ attrs: { field: {
		label = "", title = (typeof label === 'string') ? label : label.text, required, uiClass = {}
	} } }: CVnode<IPropWidget>) {
		return m("div", { class: wrapperCls(uiClass) },
			m("label", { title, class: labelCls(uiClass) }, getLabelText(label, required))
		);
	}
}
