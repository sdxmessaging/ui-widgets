
import m, { ClassComponent, CVnode } from "mithril";
import { config } from "../../config";

import { IPropWidget, LayoutType } from "../../interface/widget";

import { Basic } from "./basic";
import { FloatLabel } from "./floatLabel";

export class Layout implements ClassComponent<IPropWidget> {

	protected layout = FloatLabel;

	public view({ attrs, children }: CVnode<IPropWidget>) {
		const { field: { layout = config.layoutType } } = attrs;
		return m(layout === LayoutType.default ? Basic : this.layout, attrs, children);
	}

}
