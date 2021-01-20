import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IOptionField, IPropWidget } from "../interface/widget";

import { inputCls, inputWrapperCls, wrapperCls } from "../theme";
import { getLabel, setValue } from "../utils";
import { propInvalid } from "../validation";

export class SelectInput implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value: val } }: CVnode<IPropWidget>) {
		const {
			label: lbl, id, name = id, title = lbl,
			required, readonly, disabled, autofocus, autocomplete,
			uiClass = {},
			options
		} = field as IOptionField;
		return m("fieldset", {
			class: wrapperCls(uiClass, disabled)
		}, [
			getLabel(id, uiClass, lbl, required),
			m("div", {
				class: inputWrapperCls(uiClass, propInvalid(field, val()))
			},
				m("select.w-100.bg-transparent.bn.outline-0", {
					id, name, title,
					required, readonly, disabled, autofocus, autocomplete,
					class: inputCls(uiClass),
					value: val(),
					onchange: setValue(val)
				}, lodash.map(options, ({ value, label = value }) => m("option", {
					value,
					disabled: disabled || readonly
				}, label)))
			)
		]);
	}

}
