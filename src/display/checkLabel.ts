import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import { getConfig } from "../config";

import { IOption, IOptionField, IPropWidget } from "../interface/widget";

interface ICheckLabel {
	left?: boolean
}

export class CheckLabel implements ClassComponent<IPropWidget & ICheckLabel> {

	public view({ attrs: { field, value, left = false } }: CVnode<IPropWidget & ICheckLabel>) {
		const { options = [], config } = field as IOptionField;
		const doubleLabel = getConfig("toggleFormat", config) === "double";

		const valLabel = lodash.find(options,
			// Empty value stream to be handled as false
			lodash.matches<IOption>({ value: (!doubleLabel ? value() : !left) || false })
		);
		const truthy = doubleLabel && (Boolean(value()) && !left) || (!value() && left);
		return valLabel ? m(`span${left ? ".mr2" : ".ml2"}${truthy ? "" : ".o-40"}`, valLabel.label) : null;
	}
}
