import m, { CVnode } from "mithril";

import { FieldType, IPropWidget } from "../interface/widget";

import { inputCls } from "../theme";
import { setValue } from "../utils";
import { ValidationBase } from "../validationBase";

import { Layout } from "./layout/layout";
import { LayoutFixed } from "./layout/layoutFixedLabel";

// Types that don't support animated floating labels
const fixedLabelTypes = new Set<string>([
	FieldType.date,
	FieldType.dateTimeLocal,
	FieldType.color,
	FieldType.range
]);

export class BaseInput extends ValidationBase{

	public override view({ attrs }: CVnode<IPropWidget>) {
		const { field, value, xform = value } = attrs;
		const {
			label, id, type = FieldType.text, name = id, title = label, placeholder,
			max, maxlength, min, minlength, step, required,
			readonly, disabled, autofocus, autocomplete,
			pattern, inputmode, spellcheck,
			instant, uiClass = {}
		} = field;
		const layoutComp = fixedLabelTypes.has(type) ? LayoutFixed : Layout;
		return m(layoutComp, attrs, m("input.w-100.bg-transparent.bn.outline-0", {
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
