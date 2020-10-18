import m, { ClassComponent, CVnode } from "mithril";
import { IOptionField, IPropWidget } from "../interface/widget";

import { config } from "../config";
import { getIcon, txtCls } from "../theme";
import { getEnabledClass, getLabelText } from "../utils";

export class ToggleInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label = "", 
			title = label,
			required, 
			containerClass = "", 
			disabled,
			readonly,
			classes = "", 
			options
		} = field as IOptionField;
		let optionA, optionB;
		if(options) { optionA = options[0] ? options[0] : null; optionB = options[1] ? options[1] : null}
		return m(".w-100", {
			class: `${txtCls()} ${containerClass}`,
		},	
			m("span.pa1.flex.items-center.pointer", {
				title,
				class: `${getEnabledClass(disabled, readonly)} ${classes}`,
				onclick: () => {
					value() ? value(false) : value(true);
				}
			},
				getLabelText(label, required),

				(optionA ? 
					m("label.pl2", {
						class: `${value() ? "" : "fw6"}`
					}, optionA?.label)
				: null),
				m("i.ml2", {
					class: getIcon(value() ? config.toggleOnIcn : config.toggleOffIcn)
				}),
				(optionB ? 
					m("label.pl1", {
						class: `${value() ? "fw6" : ""}`
					}, optionB?.label) 
				: null)

			),	
		)	
	}
}
