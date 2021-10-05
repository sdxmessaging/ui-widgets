import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";
import { BaseInputExternalLabel } from "./baseInputExternalLabel";
import { BaseInputInternalLabel } from "./baseInputInternalLabel";


export class BaseInput implements ClassComponent<IPropWidget> {

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field: { floatLabel, shrink } } = attrs;
		return !floatLabel
			? m(BaseInputExternalLabel, attrs, shrink)
			: m(BaseInputInternalLabel, attrs);
	}
}
