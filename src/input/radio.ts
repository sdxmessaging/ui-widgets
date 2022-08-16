import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget, IRadioField } from "../interface/widget";

import { config } from "../config";
import { labelCls, pointerCls, checkInputCls, wrapperCls, inputWrapperCls } from "../theme";
import { getLabelText, setValue } from "../utils";

export class RadioInput implements ClassComponent<IPropWidget> {

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field, value: val } = attrs;
		const {
			label, id, name, value, title = label,
			required, readonly, disabled, autocomplete, tabindex = "0",
			labelSide = "right",
			uiClass = {}
		} = field as IRadioField;
		const checked = val() === value;
		const pointerClass = pointerCls(disabled);

		const inputLabel = label && m("span.mh1", {
			class: `${pointerClass} ${labelCls(uiClass)}`
		}, getLabelText(label));

		return m("div", {
			class: wrapperCls(uiClass, disabled),
		}, m("fieldset.w-100.bn", {
			class: inputWrapperCls(uiClass)
		}, [
			m("input.clip[type=radio]", {
				id, name, value,
				checked, required, autocomplete,
				disabled,
				tabindex: -1,
				'aria-hidden': "true",
				onchange: setValue(val)
			}),
			m("label.flex.items-center", {
				class: checkInputCls(uiClass, disabled, readonly),
				for: id,
				title,
				"data-input-id": id,
				"aria-label": label,
				tabindex,
				onkeydown: (e: KeyboardEvent) => {
					if (e.key === " ") {
						(document.activeElement?.firstElementChild as HTMLElement).click();
					}
				}
			}, [
				labelSide === "left" && m("span.mr2", inputLabel),
				m("i", {
					class: config[checked ? "radioOnIcn" : "radioOffIcn"]
				}),
				labelSide === "right" && m("span.ml2", inputLabel)
			])
		]));
	}

}
