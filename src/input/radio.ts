import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IOptionField, IPropWidget } from "../interface/widget";

import { radioInputCls } from "../theme";
import { setValue } from "../utils";

import { LayoutFixed } from "./layout/layoutFixedLabel";

export class RadioInput implements ClassComponent<IPropWidget> {

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field, value: val } = attrs;
		const {
			id, name = id,
			required, readonly, disabled, autocomplete,
			uiClass = {},
			options
		} = field as IOptionField;
		return m(LayoutFixed, attrs, m(".w-100.flex", {
			onchange: setValue(val),
			style: {
				padding: '1px 2px'
			}
		}, lodash.map(options, ({ value, label = value, icon }) => {
			const checked = val() === value;
			// No requirement for label "for" attribute
			return m("label.dib", {
				"title": label,
				"class": radioInputCls(uiClass, checked, disabled, readonly),
				"data-input-id": id
			},
				m("input.clip[type=radio]", {
					name, value, checked,
					required, autocomplete,
					disabled: disabled || readonly
				}),
				icon ? m("i.fa-fw", {
					class: icon
				}) : label
			);
		})));
	}

}
