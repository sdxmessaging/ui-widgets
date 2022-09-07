import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget, IRadioField } from "../interface/widget";

import { getConfig } from "../config";
import { checkInputCls, inputWrapperCls, wrapperCls } from "../theme";
import { getLabelText, setValue, titleFromLabel } from "../utils";

import { SelectionInner } from "./layout/SelectionInner";

export class RadioInput implements ClassComponent<IPropWidget> {

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field, value: val } = attrs;
		const {
			label, id, name, value, title = titleFromLabel(label),
			required, readonly, disabled, autocomplete, tabindex = "0",
			uiClass = {}, config
		} = field as IRadioField;
		const checked = val() === value;
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
			}, m(SelectionInner, {
				selected: checked,
				label: label ? m("span.mh1", getLabelText(label, required)) : null,
				onIcon: getConfig("radioOnIcn", config),
				offIcon: getConfig("radioOffIcn", config),
				config
			}))
		]));
	}

}
