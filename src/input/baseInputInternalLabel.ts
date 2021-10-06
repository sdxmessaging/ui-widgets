import m, { CVnode } from "mithril";
import { IOptionField, IPropWidget } from "../interface/widget";
import { setValue } from "../utils";
import { InputInternalLabel } from "./inputInternalLabel";

export class BaseInputInternalLabel extends InputInternalLabel {
	protected override viewInput({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { label, id, name = id, title = label, instant } = field as IOptionField;

		return m("input.w-100.bg-transparent.bn.outline-0.static.h-100.z-999", {
			...field,
			name,
			title,
			onfocus: this.focusIn,
			onblur: this.focusOut,
			// Update value on change or input ("instant" option)
			[instant ? "oninput" : "onchange"]: setValue(value),
		});
	}
}
