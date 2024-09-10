import m, { CVnode } from "mithril";

import { IPropWidget, IRadioField } from "../interface/widget";

import { getConfig } from "../config";
import { checkInputCls, inputWrapperCls, wrapperCls } from "../theme";
import { getLabelText, setValue, titleFromLabel } from "../utils";

import { BaseWidget } from "../baseWidget";
import { SelectionInner } from "./layout/selectionInner";

type TRadioWidget = IPropWidget<IRadioField>;
export class RadioInput extends BaseWidget<TRadioWidget> {

	public view({ attrs }: CVnode<TRadioWidget>) {
		const { field, value: val } = attrs;
		const {
			label, id, name, value, title = titleFromLabel(label),
			required, readonly, disabled, autocomplete, tabindex = "0",
			uiClass = {}, config
		} = field;
		const checked = val() === value;
		return m("div", {
			class: wrapperCls(uiClass, disabled),
		}, m("fieldset.w-100.bn", {
			class: inputWrapperCls(field, this.invalid, this.inFocus)
		}, [
			m("input.clip[type=radio]", {
				id, name, value,
				checked, required, autocomplete,
				disabled: disabled || readonly,
				tabindex: -1,
				'aria-hidden': "true",
				onchange: setValue(val)
			}),
			m("label.db", {
				class: checkInputCls(field),
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
