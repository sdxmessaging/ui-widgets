import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import { IOption, IOptionField, IPropWidget } from "../interface/widget";

export class CheckLabel implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { options = [] } = field as IOptionField;
		const valLabel = lodash.find(options,
			// Empty value stream to be handled as false
			lodash.matches<IOption>({ value: value() || false })
		);
		return valLabel ? m("span.ml2", valLabel.label) : null;
	}
}
