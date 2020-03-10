import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { getLabelText } from "../utils";

export class Label implements ClassComponent<IPropWidget> {

	public view({ attrs: { field: {
		label = "", title = label, required
	} } }: CVnode<IPropWidget>) {
		return m("label.mb2", { title }, getLabelText(label, required));
	}
}
