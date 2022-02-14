
import m, { ClassComponent, CVnode } from "mithril";
import { IPropLayoutWidget, LayoutType } from "../../interface/widget";

import { getConfig } from "../../config";

import { Basic } from "./basic";
import { FloatLabel } from "./floatLabel";

export class Layout implements ClassComponent<IPropLayoutWidget> {

	protected readonly layout = FloatLabel;

	public view({ attrs, children }: CVnode<IPropLayoutWidget>) {
		const { field: {
			config, layout = getConfig("layoutType", config)
		} } = attrs;
		return m(layout === LayoutType.default ? Basic : this.layout, attrs, children);
	}

}
