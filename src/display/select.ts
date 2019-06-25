import m, { ClassComponent, CVnode } from "mithril";

import { IOptionField, IPropWidget } from "../interface/widget";

import { getDisplayLabel, pickByProperty } from "../utils";

export class SelectText implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { classes, style } = field;
		// Get label for selected options (falling back to the value)
		const option = pickByProperty((field as IOptionField).options, { value: value() });
		const label = option ? option.label : value();
		return m(".pa2.flex.flex-wrap.bb.b--black-20", {
			class: classes,
			style
		}, [
				getDisplayLabel(field),
				m("span.ws-normal", {
					title: label
				}, label)
			]);
	}

}
