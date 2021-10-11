import m, { ClassComponent, CVnode } from "mithril";

import { FieldType, IPropWidget } from "../interface/widget";

import { inputCls } from "../theme";
import { setValue } from "../utils";

import { Layout } from "./layout/layout";

export class BaseInput implements ClassComponent<IPropWidget> {

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field, value, xform = value } = attrs;
		const {
			label, id, type = FieldType.text, name = id, title = label, placeholder,
			max, maxlength, min, minlength, step, required,
			readonly, disabled, autofocus, autocomplete,
			pattern, inputmode, spellcheck,
			instant, uiClass = {}
		} = field;

		return m(Layout, attrs, m("input.w-100.bg-transparent.bn.outline-0", {
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
