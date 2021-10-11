
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";

import { FieldType, IPropWidget, LabelType } from "../../interface/widget";

import { inputWrapperCls, labelCls, wrapperCls } from "../../theme";
import { getLabelText } from "../../utils";
import { propInvalid } from "../../validation";

export class FloatLabel implements ClassComponent<IPropWidget> {

	private focus = false;
	private focusIn = () => this.focus = true;
	private focusOut = () => this.focus = false;

	// Track element height for better positioning floating label
	private wrapperHeight = 0;
	public oncreate({ dom }: CVnodeDOM<IPropWidget>) {
		this.wrapperHeight = dom.clientHeight;
		m.redraw();
	}
	public onupdate({ dom }: CVnodeDOM<IPropWidget>) {
		if (dom.clientHeight !== this.wrapperHeight) {
			this.wrapperHeight = dom.clientHeight;
			m.redraw();
		}
	}

	public view({ attrs, children }: CVnode<IPropWidget>) {
		const { field, value, xform = value } = attrs;
		const { label, id, type = FieldType.text, required, disabled, layout, uiClass = {} } = field;

		const staticFieldTypes = type === FieldType.dateInput || type === FieldType.cardDate;
		// Float label if element has a value set or is in focus
		const shrink = layout === LabelType.floatAlways || value() || this.focus || staticFieldTypes;
		const defaultPosition = `translateY(${type !== FieldType.textarea ? `calc(${this.wrapperHeight * 0.5}px - 0.33em))`
			: `1em`}`;
		// Wrapper (padding 0.5 * shrink label size)
		return m(".relative", {
			class: type === FieldType.hidden ? "clip" : wrapperCls(uiClass, disabled),
			style: {
				paddingTop: "0.7em"
			},
			onfocusin: this.focusIn,
			onfocusout: this.focusOut
		},
			// Input wrapper
			m("fieldset.pa0.ma0", {
				class: inputWrapperCls(uiClass, propInvalid(field, xform()))
			}, [
				label ? [
					// Break fieldset border, make space for label to float into
					m("legend.db.pa0", {
						style: {
							visibility: "hidden",
							height: "0px",
							maxWidth: shrink ? "100%" : "0.01px",
							transition: "max-width 0.3s ease-in-out",
							fontSize: "0.7em"
						}
					}, m(".ph2", label)),
					// Floating label
					m("label.db.absolute.top-0", {
						title: label,
						for: id,
						class: labelCls(uiClass, required),
						style: {
							left: "0.5em",
							// Translate into center of input wrapper
							transform: shrink
								? "scale(0.7)"
								: defaultPosition,
							transformOrigin: "top left",
							display: this.wrapperHeight ? "inherit" : "none",
							transition: "transform 0.3s ease-in-out",
							// Essential for the legend to fit the correct amount of space
							wordSpacing: "2px"
						}
					}, getLabelText(label, required))
				] : null,
				// Input
				children
			])
		);
	}

}
