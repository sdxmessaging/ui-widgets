
import m, { ClassComponent, CVnode } from "mithril";
import { config } from "../../config";

import { IPropWidget, LabelType } from "../../interface/widget";

import { Basic } from "./basic";
import { FloatLabel } from "./floatLabel";

export class Layout implements ClassComponent<IPropWidget> {

	public view({ attrs, children }: CVnode<IPropWidget>) {
		const { field: { layout = config.inputDefault } } = attrs;
		return m(layout === LabelType.default ? Basic : FloatLabel, attrs, children);
	}

}
