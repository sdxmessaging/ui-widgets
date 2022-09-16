import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { FieldType, IPropLayoutWidget, IWidgetLabel, LayoutType, TProp } from "../../interface/widget";

import { getConfig } from "../../config";
import { floatLabelPlaceholderCls, inputWrapperCls, labelCls, wrapperCls } from "../../theme";
import { getLabelText, getAltLabel } from "../../utils";

export class FloatLabel implements ClassComponent<IPropLayoutWidget> {

	private focus = false;
	private focusIn = () => {
		this.focus = true;
	};
	private focusOut = () => {
		this.focus = false;
	};

	// Track element height for positioning floating label
	private inputWrapper!: HTMLElement;
	private wrapperHeight = 0;
	public oncreate({ dom }: CVnodeDOM<IPropLayoutWidget>) {
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
	protected shouldFloat(layout: LayoutType, value: TProp, readonly = false) {
		return layout === LayoutType.floatAlways || this.focus || Boolean(value) || readonly;
	}

	protected labelTranslateY() {
		return `calc(${this.wrapperHeight * 0.5}px - 1.5ex)`;
	}

	private labelContent(label: string | IWidgetLabel, required?: boolean) {
		return typeof label === "string"
			? getLabelText(label, required)
			: [getLabelText(label, required), getAltLabel(label)];
	}

	public view({ attrs, children }: CVnode<IPropLayoutWidget>) {
		const { field, invalid, value, xform = value } = attrs;
		const {
			label, id, type = FieldType.text, placeholder,
			required, disabled, readonly,
			uiClass = {}, config,
			layout = getConfig("layoutType", config)
		} = field;
		// Placeholder or value count as value content
		const floatTop = this.shouldFloat(layout, placeholder || String(xform()), readonly);
		// Wrapper (padding for shrunk label overflow)
		return m("div", {
			class: `${type === FieldType.hidden ? "clip" : wrapperCls(uiClass, disabled)} ${label ? "pt2" : ""}`,
			onfocusin: this.focusIn,
			onfocusout: this.focusOut
		},
			// Input wrapper
			m("fieldset.relative.pa0.ma0.flex.w-100", {
				class: inputWrapperCls(uiClass, invalid)
			}, [
				label && this.wrapperHeight ? [
					// Break fieldset border, make space for label to float into
					m("legend.db.hidden.h-05ch.transition-mw", {
						class: `${labelCls(uiClass, required)} ${floatTop ? "mw-100" : "mw-001px"}`,
					}, m("span.f-07em",
						this.labelContent(label, required)
					)),
					// Floating label
					m(".absolute.top-0.transition-transform", {
						style: {
							// Input wrapper legend or center
							transform: `translateY(${floatTop ? "-1ch" : this.labelTranslateY()})`
						}
					}, m("label.db.transition-f", {
						for: id, title: typeof label === "string" ? label : label.text,
						class: floatLabelPlaceholderCls(uiClass, floatTop, required)
					}, this.labelContent(label, required)))
				] : null,
				// Input
				children
			])
		);
	}

}

