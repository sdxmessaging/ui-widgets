import m, { CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { textareaCls } from "../theme";
import { setValue } from "../utils";

import { InputInternalLabel } from "./inputInternalLabel";

export class TextareaInputInternalLabel extends InputInternalLabel {

	protected override viewInput({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label, placeholder,
			required, readonly, disabled, autofocus, autocomplete, spellcheck,
			instant, uiClass = {}
		} = field;
		return m("textarea.w-100.bg-transparent.bn.outline-0.h-100.z-999", {
			id, name, title,
			placeholder, required, readonly, disabled, autofocus, autocomplete, spellcheck,
			class: textareaCls(uiClass),
			value: value(),
			onfocus: this.focusIn,
			onblur: this.focusOut,
			style: { resize: "none" },
			// Update value on change or input ("instant" option)
			[instant ? "oninput" : "onchange"]: setValue(value)
		});
	}
}
