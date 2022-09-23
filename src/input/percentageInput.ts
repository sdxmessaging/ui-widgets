import m, { ClassComponent, CVnode } from "mithril";

import { FieldType, IPropWidget } from "../interface/widget";

import { getConfig } from "../config";
import { inputCls, joinClasses } from "../theme";
import { selectTarget, setValue, titleFromLabel } from "../utils";
import { propInvalid } from "../validation";

import { LayoutFixed } from "./layout/layoutFixedLabel";

export class PercentageInput implements ClassComponent<IPropWidget> {

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field, value, xform = value } = attrs;
		const {
			label, id, name = id, title = titleFromLabel(label), placeholder,
			max, maxlength, min, minlength, step, required,
			readonly, disabled, autofocus, autocomplete, tabindex,
			pattern, inputmode, spellcheck,
			instant, uiClass = {}, config
		} = field;
		const badgePosition = getConfig("badgePosition", config);
		return m(LayoutFixed, {
			field,
			value,
			invalid: propInvalid(field, value())
		},
			m('.flex.flex-row.w-100', [
				m("span.self-center", {
					class: joinClasses([
						badgePosition === "left" ? "order-0 mr1" : "order-last ml1",
						inputCls(uiClass)
					])
				}, "%"),
				m("input.w-100.bg-transparent.bn.outline-0", {
					id, type: FieldType.number, name, title, placeholder,
					max, maxlength, min, minlength, step, required,
					readonly, disabled, autofocus, autocomplete, tabindex,
					pattern, inputmode, spellcheck,
					class: joinClasses([
						badgePosition === "right" ? "tr" : "",
						inputCls(uiClass)
					]),
					onfocus: selectTarget,
					value: xform(),
					// Update value on change or input ("instant" option)
					[instant ? "oninput" : "onchange"]: setValue(value)
				})
			]));
	}
}
