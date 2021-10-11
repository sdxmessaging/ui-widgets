import m, { ClassComponent, CVnode } from "mithril";
import { config } from "../config";

import { IPropWidget, LabelType } from "../interface/widget";

import { textareaCls } from "../theme";
import { setValue } from "../utils";

import { Basic } from "./layout/basic";
import { FloatLabel } from "./layout/floatLabel";

export class TextareaInput implements ClassComponent<IPropWidget> {

	public view({ attrs }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label, placeholder,
			required, readonly, disabled, autofocus, autocomplete, spellcheck,
			instant, layout = config.inputDefault, uiClass = {}
		} = attrs.field;
		const { value } = attrs;
		return m(layout === LabelType.default ? Basic : FloatLabel, attrs, m("textarea.w-100.bg-transparent.bn.outline-0.h-100", {
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
