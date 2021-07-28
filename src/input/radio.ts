import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IOptionField, IPropWidget } from "../interface/widget";

import { inputWrapperCls, radioInputCls, wrapperCls } from "../theme";
import { getLabel, setValue } from "../utils";
import { propInvalid } from "../validation";

export class RadioInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value: val } }: CVnode<IPropWidget>) {
		const {
			label: lbl, id, name = id,
			required, readonly, disabled, autocomplete,
			options,
			uiClass = {}
		} = field as IOptionField;
		return m("fieldset", {
			class: wrapperCls(uiClass, disabled)
		}, [
			getLabel(id, uiClass, lbl, required),
			m("div", {
				class: inputWrapperCls(uiClass, propInvalid(field, val())),
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
			}))
		]);
	}

}
