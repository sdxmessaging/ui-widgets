import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IOption, IOptionField, IPropWidget } from "../interface/widget";

interface ICheckLabel {
	left?: boolean
}

export class CheckLabel implements ClassComponent<IPropWidget & ICheckLabel> {

	public view({ attrs: { field, value, left = false } }: CVnode<IPropWidget & ICheckLabel>) {
		const { options = [], doubleLabel } = field as IOptionField;
		const valLabel = lodash.find(options,
			// Empty value stream to be handled as false
			lodash.matches<IOption>({ value: (!doubleLabel ? value() : left) || false })
		);
		return valLabel ? m(`span.${left ? "mr2" : ""}`, valLabel.label) : null;
	}
}
