
import m, { ClassComponent, CVnode } from "mithril";

import { FieldType, IPropLayoutWidget } from "../../interface/widget";

import { inputWrapperCls, wrapperCls } from "../../theme";
import { getLabel } from "../../utils";
export class Basic implements ClassComponent<IPropLayoutWidget> {

	public view({ attrs, children }: CVnode<IPropLayoutWidget>) {
		const { field, invalid } = attrs;
		const { label, id, type = FieldType.text, required, disabled, uiClass = {} } = field;
		// Wrapper
		return m("div", {
			class: type === FieldType.hidden ? "clip" : wrapperCls(uiClass, disabled)
		}, [
			// Basic label
			getLabel(id, uiClass, label, required),
			// Input wrapper
			m("fieldset.bn", {
				class: inputWrapperCls(uiClass, invalid)
			},
				// Input
				children
			)
		]);

	}

}
