import m, { CVnode } from "mithril";

import { IPropWidget, ITextareaField } from "../interface/widget";

import { textareaCls } from "../theme";
import { setValue, titleFromLabel } from "../utils";

import { ValidationBase } from "../validationBase";
import { LayoutTop } from "./layout/layoutTopLabel";

export class TextareaInput extends ValidationBase<IPropWidget<ITextareaField>> {

	protected override readonly selector = "textarea";

	public view({ attrs }: CVnode<IPropWidget<ITextareaField>>) {
		const { field, value, xform = value } = attrs;
		const {
			label, id, name = id, title = titleFromLabel(label), placeholder,
			required, readonly, disabled, autofocus, autocomplete,
			minlength, maxlength, tabindex, spellcheck, rows, cols, wrap,
			instant, uiClass = {}
		} = attrs.field;
		return m(LayoutTop, {
			field,
			value,
			xform,
			invalid: this.invalid,
			focus: this.inFocus
		}, m("textarea.w-100.bg-transparent.bn.outline-0.h-100.resize-none", {
			id, name, title,
			placeholder, required, readonly, disabled, autofocus, autocomplete,
			minlength, maxlength, tabindex, spellcheck, rows, cols, wrap,
			class: textareaCls(uiClass),
			value: value(),
			// Update value on change or input ("instant" option)
			[instant ? "oninput" : "onchange"]: setValue(value)
		}));
	}
}
