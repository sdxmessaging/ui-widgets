
import m, { ClassComponent, CVnode } from "mithril";

import { FieldType, IPropWidget } from "../../interface/widget";

import { inputWrapperCls, wrapperCls } from "../../theme";
import { getLabel } from "../../utils";
import { propInvalid } from "../../validation";

export class Basic implements ClassComponent<IPropWidget> {

	public view({ attrs, children }: CVnode<IPropWidget>) {
		const { field, value, xform = value } = attrs;
		const { label, id, type = FieldType.text, required, disabled, uiClass = {} } = field;
		// Wrapper
		return m("fieldset", {
			class: type === FieldType.hidden ? "clip" : wrapperCls(uiClass, disabled)
		}, [
			// Basic label
			getLabel(id, uiClass, label, required),
			// Input wrapper
			m("div", {
				class: inputWrapperCls(uiClass, propInvalid(field, xform()))
			},
				// Input
				children
			)
		]);

	}

}
