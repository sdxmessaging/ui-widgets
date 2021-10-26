import m, {CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { textareaCls } from "../theme";
import { setValue } from "../utils";
import { ValidationBase } from "../validationBase";

import { LayoutTop } from "./layout/layoutTopLabel";

export class TextareaInput extends ValidationBase {

	public override view({ attrs }: CVnode<IPropWidget>) {
		const { field, value, xform = value } = attrs;
		const {
			label, id, name = id, title = label, placeholder,
			required, readonly, disabled, autofocus, autocomplete, spellcheck,
			instant, uiClass = {}
		} = attrs.field;
		return m(LayoutTop, {field, value, xform, invalid: this.invalid}, m("textarea.w-100.bg-transparent.bn.outline-0.h-100", {
			id, name, title,
			placeholder, required, readonly, disabled, autofocus, autocomplete, spellcheck,
			class: textareaCls(uiClass),
			value: value(),
			style: { resize: "none" },
			// Update value on change or input ("instant" option)
			[instant ? "oninput" : "onchange"]: setValue(value)
		}));
	}
}
