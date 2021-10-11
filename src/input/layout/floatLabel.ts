
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";

import { FieldType, IPropWidget, LabelType } from "../../interface/widget";

import { inputWrapperCls, labelCls, wrapperCls } from "../../theme";
import { getLabelText } from "../../utils";
import { propInvalid } from "../../validation";

const floatAlwaysOverride = new Set<string>([
	FieldType.dateInput,
	FieldType.cardDate,
	FieldType.select,
	FieldType.radio
]);

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

		// Float label if element has a value set or is in focus
		const floatTop = layout === LabelType.floatAlways || floatAlwaysOverride.has(type) || value() || this.focus;
		const defaultPosition = `translateY(${type !== FieldType.textarea ? `calc(${this.wrapperHeight * 0.5}px - 0.33em))`
			: `1em`}`;
		// Wrapper (padding 0.5 * shrink label size)
		return m(".relative", {
			class: type === FieldType.hidden ? "clip" : wrapperCls(uiClass, disabled),
			style: {
				paddingTop: "10px"
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
						class: labelCls(uiClass, required),
						style: {
							visibility: "hidden",
							height: "0px",
							maxWidth: floatTop ? "100%" : "0.01px",
							transition: "max-width 0.3s ease-in-out",
							marginLeft: floatTop ? "0.7em" : '',
						}
					}, m("span", {
						style: {
							fontSize: ".7em",
							padding: "0 .7ex 0 .7ex",
						}
					}, label)),
					// Floating label
					m('div',
						{ class: labelCls(uiClass, required) },
						m("label.db.absolute.top-0", {
							title: label,
							for: id,
							style: {
								// Translate into center of input wrapper
								transform: floatTop
									? "translate(2ch, calc(10px - 1ch))"
									: defaultPosition,
								fontSize: floatTop ? "0.7em" : "1em",
								display: this.wrapperHeight ? "inherit" : "none",
								transition: "transform 0.3s ease-in-out, font-size 0.3s ease-in-out",
							}
						}, getLabelText(label, required))
					),
				] : null,
				// Input
				children
			])
		);
	}

}
