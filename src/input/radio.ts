import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget, IRadioField } from "../interface/widget";
import { labelCls, pointerCls, radioInputCls } from "../theme";
import { setValue } from "../utils";

export class RadioInput implements ClassComponent<IPropWidget> {

	public oninit({ attrs: { field, value: val } }: CVnode<IPropWidget>) {
		const { defaultChecked, value } = field as IRadioField;
		val(defaultChecked ? value : "");
	}

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field, value: val } = attrs;
		const {
			id, name,
			disabled, tabindex = "0",
			uiClass = {},
			value, label,
			labelSide = "right",
			// autocomplete,
			required
		} = field as IRadioField;
		const checked = val() === value;
		const pointerClass = pointerCls(disabled);
		const inputLabel = label && m("span.mh1", {
			class: `${pointerClass} ${labelCls(uiClass)}`
		}, label);
		return m("label", {
			class: radioInputCls(uiClass, checked, disabled),
			for: id,
			"data-input-id": id,
			tabindex,
			onkeydown: (e: KeyboardEvent) => {
				if (e.key === " ") {
					(document.activeElement?.firstElementChild as HTMLElement).click();
				}
			}
		}, [
			labelSide === "left" && inputLabel,
			m("input", {
				type: "radio",
				value,
				required,
				name, id, disabled, tabindex,
				label,
				checked,
				onchange: setValue(val),
				class: pointerClass
			}),
			labelSide === "right" && inputLabel
		]);
	}

}
