import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { getLabelText } from "../utils";

export class Label implements ClassComponent<IPropWidget> {

	public view({ attrs: { field } }: CVnode<IPropWidget>) {
		return m("label.mb2", getLabelText(field));
	}
}
