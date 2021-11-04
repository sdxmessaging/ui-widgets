
import m, { ClassComponent, CVnode } from "mithril";
import { config } from "../../config";

import { IPropLayoutWidget, LayoutType } from "../../interface/widget";

import { Basic } from "./basic";
import { FloatLabel } from "./floatLabel";

export class Layout implements ClassComponent<IPropLayoutWidget> {

	protected readonly layout = FloatLabel;

	public view({ attrs, children }: CVnode<IPropLayoutWidget>) {
		const { field: { layout = config.layoutType } } = attrs;
		return m(layout === LayoutType.default ? Basic : this.layout, attrs, children);
	}

}
