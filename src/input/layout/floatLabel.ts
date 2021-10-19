import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { config } from "../../config";

import { FieldType, IPropWidget, LayoutType, TProp } from "../../interface/widget";

import { inputWrapperCls, labelCls, wrapperCls } from "../../theme";
import { getLabelText } from "../../utils";
import { propInvalid } from "../../validation";

const shrinkFont = "0.7em";
const transitionOpts = "0.3s ease-in-out";

export class FloatLabel implements ClassComponent<IPropWidget> {

	private focus = false;
	private focusIn = (e: Event) => {
		e.preventDefault();
		this.focus = true;
	};
	private focusOut = (e: Event) => {
		e.preventDefault();
		this.focus = false;
	};

	// Track element height for positioning floating label
	private inputWrapper!: HTMLElement;
	private wrapperHeight = 0;
	public oncreate({ dom }: CVnodeDOM<IPropWidget>) {
		this.inputWrapper = dom.firstElementChild as HTMLElement;
		this.calcHeight();

	}
	public onupdate() {
		this.calcHeight();
	}
	private calcHeight() {
		if (this.inputWrapper.clientHeight !== this.wrapperHeight) {
			this.wrapperHeight = this.inputWrapper.clientHeight;
			m.redraw();
		}
	}

	// Float label if element has a value set or is in focus
	protected shouldFloat(layout: LayoutType, value: TProp) {
		return layout === LayoutType.floatAlways || value || this.focus;
	}

	protected labelTranslateY() {
		return `calc(${this.wrapperHeight * 0.5}px - 1.5ex)`;
	}

	public view({ attrs, children }: CVnode<IPropWidget>) {
		const { field, value, xform = value } = attrs;
		const {
			label, id, type = FieldType.text, placeholder, required, disabled,
			layout = config.layoutType, uiClass = {}
		} = field;
		// Placeholder or value count as value content
		const floatTop = this.shouldFloat(layout, placeholder || value());
		// Wrapper (padding for shrunk label overflow)
		return m("div", {
			class: type === FieldType.hidden ? "clip" : wrapperCls(uiClass, disabled),
			style: label ? { paddingTop: "0.5rem" } : {},
			onfocusin: this.focusIn,
			onfocusout: this.focusOut
		},
			// Input wrapper
			m("fieldset.relative.pa0.ma0.flex.w-100", {
				class: inputWrapperCls(uiClass, propInvalid(field, xform()))
			}, [
				label && this.wrapperHeight ? [
					// Break fieldset border, make space for label to float into
					m("legend.db", {
						class: labelCls(uiClass, required),
						style: {
							visibility: "hidden",
							height: "0.5ch",
							transition: `max-width ${transitionOpts}`,
							maxWidth: floatTop ? "100%" : "0.01px"
						}
					}, m("span", {
						style: {
							fontSize: shrinkFont
						}
					}, getLabelText(label, required))),
					// Floating label
					m(".absolute.top-0", {
						class: labelCls(uiClass, required),
						style: {
							transition: `transform ${transitionOpts}`,
							// Input wrapper legend or center
							transform: `translateY(${floatTop ? "-1ch" : this.labelTranslateY()})`
						}
					}, m("label.db", {
						for: id, title: label,
						style: {
							transition: `font-size ${transitionOpts}`,
							fontSize: floatTop ? shrinkFont : "1em",
						}
					}, getLabelText(label, required)))
				] : null,
				// Input
				children
			])
		);
	}

}
