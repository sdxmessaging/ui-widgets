import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import { IOption, IOptionField, IPropWidget } from "../interface/widget";

import { config } from "../config";
import { getIcon, txtCls } from "../theme";
import { getEnabledClass, getLabelText } from "../utils";

export class ToggleInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label = "", title = label,
			required, readonly, disabled,
			containerClass = "", classes = "",
			options = []
		} = field as IOptionField;
		const valLabel = lodash.find(options,
			// Empty value stream to be handled as false
			lodash.matches<IOption>({ value: value() || false })
		);
		return m(".w-100", {
			class: `${txtCls()} ${containerClass}`,
		},
			m("label.flex.items-center.pointer", {
				title,
				class: `${getEnabledClass(disabled, readonly)} ${classes}`,
				onclick: () => {
					value() ? value(false) : value(true);
				}
			},
				getLabelText(label, required),
				m("i.ml2", {
					class: getIcon(value() ? config.toggleOnIcn : config.toggleOffIcn)
				}),
				valLabel ? m("span.ml2", valLabel.label) : null
			)
		);
	}
}
