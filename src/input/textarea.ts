import m, { ClassComponent, CVnode } from "mithril";
import { TextareaInputInternalLabel } from "./textareaInputInternalLabel";

import { IPropWidget } from "../interface/widget";

import { TextareaInputExternalLabel } from "./textareaInputExternalLabel";

export class TextareaInput implements ClassComponent<IPropWidget> {

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field: { floatLabel, shrink = false } } = attrs;
		return !floatLabel
			? m(TextareaInputExternalLabel, attrs)
			: m(TextareaInputInternalLabel, attrs, shrink);
	}

}
