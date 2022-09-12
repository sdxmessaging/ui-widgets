import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IOptionField, IPropWidget } from "../interface/widget";

import { theme, wrapperCls } from "../theme";
import { getDisplayLabel } from "../utils";

type TSelectWidget = IPropWidget<IOptionField>;
export class SelectText implements ClassComponent<TSelectWidget> {

	public view({ attrs: { field, value } }: CVnode<TSelectWidget>) {
		const { label: lbl, options, uiClass = {} } = field;
		// Get label for selected options (falling back to the value)
		const option = lodash.find(options, { value: value() });
		const label = option ? option.label || option.value : value();
		return m(".pa2.flex.flex-wrap", {
			class: wrapperCls(uiClass),
		}, [
			getDisplayLabel(lbl),
			m("span.ws-normal", {
				title: label,
				class: theme.displayValue
			}, label)
		]);
	}

}
