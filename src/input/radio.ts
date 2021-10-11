import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import { config } from "../config";

import { IOptionField, IPropWidget, LabelType } from "../interface/widget";

import { radioInputCls } from "../theme";
import { setValue } from "../utils";
// import { propInvalid } from "../validation";
import { Basic } from "./layout/basic";
import { FloatLabel } from "./layout/floatLabel";

export class RadioInput implements ClassComponent<IPropWidget> {

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field, value: val } = attrs;
		const {
			id, name = id,
			required, readonly, disabled, autocomplete,
			options, layout = config.inputDefault,
			uiClass = {}
		} = field as IOptionField;
		return m(layout === LabelType.default ? Basic : FloatLabel, attrs,
			m(".w-100.flex", {
				onchange: setValue(val)
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
			})
			)
		);
	}

}
