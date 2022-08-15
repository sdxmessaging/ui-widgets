import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget, IRadioField } from "../interface/widget";
import { labelCls, pointerCls, radioInputCls } from "../theme";
import { getLabelText, setValue } from "../utils";

export class RadioInput implements ClassComponent<IPropWidget> {

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field, value: val } = attrs;
		const {
			id, name, value,
			disabled, tabindex = "0",
			label, labelSide = "right",
			required,
			uiClass = {}
		} = field as IRadioField;
		const checked = val() === value;
		const pointerClass = pointerCls(disabled);
		const inputLabel = label && m("span.mh1", {
			class: `${pointerClass} ${labelCls(uiClass)}`
		}, getLabelText(label));
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
