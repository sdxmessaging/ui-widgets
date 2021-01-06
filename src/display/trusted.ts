import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

export class Trusted implements ClassComponent<IPropWidget> {

	public view({ attrs: { field: { style }, value } }: CVnode<IPropWidget>) {
		return m(".pa2", {
			style
		}, m.trust(value() as string));
	}

}
