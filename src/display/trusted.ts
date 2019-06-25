import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

export class Trusted implements ClassComponent<IPropWidget> {

	public view({ attrs: { field: { classes, style }, value } }: CVnode<IPropWidget>) {
		return m(".pa2", {
			class: classes,
			style
		}, m.trust(value() as string));
	}

}
