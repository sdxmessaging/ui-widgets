import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";
import { BaseInputExternalLabel } from "./baseInputExternalLabel";
import { BaseInputInternalLabel } from "./baseInputInternalLabel";


export class BaseInput implements ClassComponent<IPropWidget> {

	public view({ attrs }: CVnode<IPropWidget>) {
		const { labelStyle = 'external' } = attrs;
		return labelStyle === "external"
			? m(BaseInputExternalLabel, attrs)
			: m(BaseInputInternalLabel, attrs);
	}
}
