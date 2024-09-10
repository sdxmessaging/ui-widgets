import m, { ClassComponent, CVnode } from "mithril";
import { FieldType, IPropLayoutWidget, IWidgetLabel, LayoutType, TProp } from "../../interface/widget";

import { getConfig } from "../../config";
import { floatLabelPlaceholderCls, inputWrapperCls, joinClasses, labelCls, wrapperCls } from "../../theme";
import { getLabelText, getAltLabel } from "../../utils";

export class FloatLabel implements ClassComponent<IPropLayoutWidget> {

	// Float label if element has a value set or is in focus
	protected shouldFloat(layout: LayoutType, value: TProp, focus: boolean, readonly = false) {
		return layout === LayoutType.floatAlways || focus || Boolean(value) || readonly;
	}

	protected labelTranslateY() {
		// 50% down + legend height(0.5ch with 0.7em child text) - 1.5 * "x" height
		return "calc(50% + 0.175ch - 1.5ex)";
	}

	private labelContent(label: string | IWidgetLabel, required?: boolean) {
		return typeof label === "string"
			? getLabelText(label, required)
			: [getLabelText(label, required), getAltLabel(label)];
	}

	public view({ attrs, children }: CVnode<IPropLayoutWidget>) {
		const { field, value, xform = value, invalid, focus } = attrs;
		const {
			label, id, type = FieldType.text, placeholder,
			required, disabled, readonly,
			uiClass = {}, config,
			layout = getConfig("layoutType", config)
		} = field;
		// Placeholder or value count as value content
		const floatTop = this.shouldFloat(layout, placeholder || (xform() != null && String(xform())), focus, readonly);
		// Wrapper (padding for shrunk label overflow)
		return m("div", {
			class: joinClasses([
				type === FieldType.hidden ? "clip" : wrapperCls(uiClass, disabled),
				label ? "pt2" : null
			])
		},
			// Input wrapper
			m("fieldset.relative.pa0.ma0.w-100", {
				class: inputWrapperCls(field, invalid)
			}, [
				label ? [
					// Break fieldset border, make space for label to float into
					m("legend.db.hidden.h-05ch.transition-mw", {
						class: `${labelCls(uiClass, required)} ${floatTop ? "mw-100" : "mw-001px"}`,
					}, m("span.f-07em",
						this.labelContent(label, required)
					)),
					// Floating label container, fill fieldset inner region
					m(".absolute.h-100.top-0.transition-transform.pe-none", {
						style: {
							// Input wrapper legend or center of fieldset
							transform: `translateY(${floatTop ? "-1ch" : this.labelTranslateY()})`
						}
					}, m("label.db.transition-f", {
						for: id, title: typeof label === "string" ? label : label.text,
						class: floatLabelPlaceholderCls(field, floatTop)
					}, this.labelContent(label, required)))
				] : null,
				// Input
				children
			])
		);
	}

}
