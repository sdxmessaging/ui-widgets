import m, { CVnode } from "mithril";
import stream from "mithril/stream";

import { FieldType, IPropWidget } from "../interface/widget";

// import { getConfig, getIcon } from "../config";
import { inputCls, theme } from "../theme";
import { setValue } from "../utils";

import { ValidationBase } from "../validationBase";
import { LayoutFixed } from "./layout/layoutFixedLabel";
import { TimeScroller } from "./timeScroller";

function cleanTime(value: string) {
	return value.replace(/[^0-9]/g, "").slice(0, 2);
}

function padZero(value: string) {
	return value.padStart(2, '0');
}

export class TimeInput extends ValidationBase<IPropWidget> {

	private showPicker = false;

	// Hour/Minute input, clamped to 0-2 chars, padded with leading 0
	private readonly hour = stream<string>();
	private readonly cleanHour = this.hour.map(cleanTime);
	private readonly min = stream<string>();
	private readonly cleanMin = this.min.map(cleanTime);
	// Combined hour/minute stream
	private readonly time = stream.lift(
		(hour, min) => hour && min
			? `${padZero(hour)}:${padZero(min)}`
			: ""
		, this.cleanHour, this.cleanMin
	);

	public oninit({ attrs: { value } }: CVnode<IPropWidget>) {
		// Write valid time to value stream
		this.time.map((time) => value(time));
	}

	public onbeforeupdate({ attrs: { value } }: CVnode<IPropWidget>) {
		// Update hour/minute streams from value stream if changed
		const inVal = value();
		if (inVal !== this.time()) {
			const [hour, min = ""] = String(inVal).split(":");
			this.hour(hour);
			this.min(min);
		}
	}

	public onremove() {
		this.time.end(true);
		this.min.end(true);
		this.hour.end(true);
	}

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field, value } = attrs;
		const {
			id, name = id, step,
			required, readonly, disabled,
			uiClass = {}
		} = field;
		const classStr = inputCls(uiClass);

		return m(LayoutFixed, {
			field,
			value,
			invalid: this.invalid
		}, m(".flex.items-center", [
			m(".relative.flex-auto.ph-2px.pv-1px", {
				// onclick: () => focusLastInput(this.dom(), id, this.focusedInput())
			}, [
				// Hidden input
				m("input.clip[type=text]", {
					name, value: value(),
					required,
					tabindex: -1,
					ariaHidden: "true"
				}),
				// Time Input parts
				m("input.di.w-100.mw-dd.pa0.bg-transparent.bn.outline-0.tc", {
					id: `${id}-hh`, name: `${name}-hh`,
					type: FieldType.number, placeholder: "hh",
					min: 0, max: 23,
					required, readonly, disabled,
					'aria-label': `${name}: Hour`,
					value: this.cleanHour(),
					class: classStr,
					oninput: setValue(this.hour)
				}),
				m("span.mr-2px", ":"),
				m("input.di.w-100.mw-dd.pa0.bg-transparent.bn.outline-0.tc", {
					id: `${id}-mm`, name: `${name}-mm`,
					type: FieldType.number, placeholder: "mm",
					min: 0, max: 59, step,
					required, readonly, disabled,
					'aria-label': `${name}: Minute`,
					value: this.cleanMin(),
					class: classStr,
					oninput: setValue(this.min)
				}),

				// FLoating time picker
				this.showPicker && m(".flex.items-center.absolute.z-max.us-none", {
					class: theme.timeInputScrollerWrapper
				}, [
					m(TimeScroller, {
						value: this.hour,
						min: 1, max: 23
					}),
					m("span.ph2.f6", ":"),
					m(TimeScroller, {
						value: this.min,
						min: 0, max: 55,
						step: step === "any" ? 1 : step
					})
				])
			]),

			!(disabled || readonly) && m(".fas.fa-clock.pointer", {
				onclick: () => this.showPicker = !this.showPicker
			})
		]));
	}

}
