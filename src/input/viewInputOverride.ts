


import { CVnode } from "mithril";
import { IPropWidget } from "..";
import { InputInternalLabel } from "./inputInternalLabel";

export class ViewInputOverride extends InputInternalLabel {

	protected override viewInput({ attrs: { children } }: CVnode<IPropWidget>) {
		return children;
	}
}
