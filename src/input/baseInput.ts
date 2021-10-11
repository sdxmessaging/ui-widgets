import m, { ClassComponent, CVnode } from "mithril";
import { config } from "../config";

import { FieldType, IPropWidget, LabelType } from "../interface/widget";

import { inputCls } from "../theme";
import { setValue } from "../utils";

import { Basic } from "./layout/basic";
import { FloatLabel } from "./layout/floatLabel";

export class BaseInput implements ClassComponent<IPropWidget> {

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field, value, xform = value } = attrs;
		const {
			label, id, type = FieldType.text, name = id, title = label, placeholder,
			max, maxlength, min, minlength, step, required,
			readonly, disabled, autofocus, autocomplete,
			pattern, inputmode, spellcheck,
			instant, layout = config.inputDefault, uiClass = {}
		} = field;

		return m(layout === LabelType.default ? Basic : FloatLabel, attrs, m("input.w-100.bg-transparent.bn.outline-0", {
			id, type, name, title, placeholder,
			max, maxlength, min, minlength, step, required,
			readonly, disabled, autofocus, autocomplete,
			pattern, inputmode, spellcheck,
			class: inputCls(uiClass),
			value: xform(),
			// Update value on change or input ("instant" option)
			[instant ? "oninput" : "onchange"]: setValue(value)
		}));
	}

}
