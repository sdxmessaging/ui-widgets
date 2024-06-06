import m, { CVnode } from "mithril";
import stream from "mithril/stream";

import { FieldType, IPropWidget, TPropStream } from "../interface/widget";

import { getConfig, getIcon } from "../config";
import { inputCls } from "../theme";
import { setValue } from "../utils";

import { ValidationBase } from "../validationBase";
import { LayoutFixed } from "./layout/layoutFixedLabel";
import { TimePicker } from "./timePicker";

function cleanTime(value: string) {
	return value.replace(/[^0-9]/g, "").slice(0, 2);
}

function padZero(value: string) {
	return value.padStart(2, '0');
}

const enum Focus { None, Hour, Minute }

export class TimeInput extends ValidationBase<IPropWidget> {

	private showPicker = false;
	private focus = Focus.None;

	// Hour/Minute input, clamped to 0-2 chars, padded with leading 0
	private readonly hour = stream<string>();
	private readonly cleanHour = this.hour.map(cleanTime);
	private readonly padHour = this.cleanHour.map(padZero);
	private readonly min = stream<string>();
	private readonly cleanMin = this.min.map(cleanTime);
	private readonly padMin = this.cleanMin.map(padZero);
	// Combined hour/minute stream
	private readonly time = stream.lift(
		(hour, min) => hour && min ? `${hour}:${min}` : "",
		this.padHour, this.padMin
	);

	/** Update hour/minute streams from value stream if changed */
	private syncTime(value: TPropStream) {
		const inVal = value();
		if (inVal !== this.time()) {
			const [hour, min = ""] = String(inVal).split(":");
			this.hour(hour);
			this.min(min);
		}
	}

	public oninit({ attrs: { value } }: CVnode<IPropWidget>) {
		// Write valid time to value stream
		this.time.map((time) => value(time));
		this.syncTime(value);
	}

	public onbeforeupdate({ attrs: { value } }: CVnode<IPropWidget>) {
		this.syncTime(value);
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
			uiClass = {}, config
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
				m("input.di.w-100.mw-tt.pa0.bg-transparent.bn.outline-0.tc", {
					id: `${id}-hh`, name: `${name}-hh`,
					type: FieldType.number, placeholder: "--",
					min: 0, max: 23,
					required, readonly, disabled,
					'aria-label': `${name}: Hour`,
					value: this.focus === Focus.Hour ? this.cleanHour() : this.padHour(),
					class: classStr,
					oninput: setValue(this.hour),
					onfocus: () => this.focus = Focus.Hour,
					onblur: () => this.focus = Focus.None
				}),
				m("span.mr-2px", ":"),
				m("input.di.w-100.mw-tt.pa0.bg-transparent.bn.outline-0.tc", {
					id: `${id}-mm`, name: `${name}-mm`,
					type: FieldType.number, placeholder: "--",
					min: 0, max: 59, step,
					required, readonly, disabled,
					'aria-label': `${name}: Minute`,
					value: this.focus === Focus.Minute ? this.cleanMin() : this.padMin(),
					class: classStr,
					oninput: setValue(this.min),
					onfocus: () => this.focus = Focus.Minute,
					onblur: () => this.focus = Focus.None
				}),
				// FLoating time picker
				this.showPicker && m(TimePicker, {
					hour: this.hour,
					min: this.min,
					step: step === "any" ? 1 : step,
					config,
					onClose: () => this.showPicker = false
				})
			]),

			!(disabled || readonly) && m(".pointer", {
				// TimePicker onClose event will handle hiding the picker
				onclick: () => this.showPicker = true
			},
				getIcon(getConfig("timePickerIcn", config), "ph-2px pv-1px")
			)
		]));
	}

}
