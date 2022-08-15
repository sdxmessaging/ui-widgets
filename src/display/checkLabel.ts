import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IOption, TProp } from "../interface/widget";
import { joinClasses } from "../theme";

interface ICheckLabel {
	value: TProp;
	doubleLabel: boolean;
	options?: IOption[];
	left: boolean;
}

export class CheckLabel implements ClassComponent<ICheckLabel> {

	public view({ attrs: { value, doubleLabel, options, left } }: CVnode<ICheckLabel>) {
		const valLabel = lodash.find(options,
			// Empty value stream to be handled as false
			lodash.matches<IOption>({ value: (!doubleLabel ? value : !left) || false })
		);
		const truthy = (Boolean(value) && !left) || (!value && left) || !doubleLabel;
		return valLabel && valLabel.label
			? m("span", {
				class: joinClasses([left ? "mr2" : "ml2", truthy ? "" : "o-40"])
			}, valLabel.label)
			: null;
	}
}
