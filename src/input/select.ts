import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import { config } from "../config";

import { IOptionField, IPropWidget, LabelType } from "../interface/widget";

import { inputCls } from "../theme";
import { setValue } from "../utils";
import { Basic } from "./layout/basic";
import { FloatLabel } from "./layout/floatLabel";

export class SelectInput implements ClassComponent<IPropWidget> {

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field, value: val } = attrs;
		const {
			label: lbl, id, name = id, title = lbl,
			required, readonly, disabled, autofocus, autocomplete,
			uiClass = {}, layout = config.inputDefault,
			options
		} = field as IOptionField;
		return m(layout === LabelType.default ? Basic : FloatLabel, attrs,

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
	}

}
