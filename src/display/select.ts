import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IOptionField, IPropWidget } from "../interface/widget";

import { theme } from "../theme";
import { getDisplayLabel } from "../utils";

export class SelectText implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { label: lbl, uiClass = {}, style } = field;
		const { wrapper = "" } = uiClass;
		// Get label for selected options (falling back to the value)
		const option = lodash.find((field as IOptionField).options, { value: value() });
		const label = option ? option.label || option.value : value();
		return m(".pa2.flex.flex-wrap", {
			class: `${wrapper} ${theme.wrapper}`,
			style
		}, [
			getDisplayLabel(lbl),
			m("span.ws-normal", {
				title: label,
				class: theme.displayValue
			}, label)
		]);
	}

}
