import flatpickr from "flatpickr";
import lodash from "lodash";
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";
import { getConfig, getIcon } from "../config";

import { IPropWidget } from "../interface/widget";

export function getYmd(date: Date): [string, string, string] {
	return [
		String(date.getFullYear()),
		lodash.padStart(String(1 + date.getMonth()), 2, "0"),
		lodash.padStart(String(date.getDate()), 2, "0"),
	];
}

export class DatePicker implements ClassComponent<IPropWidget> {

	private flatpickr!: flatpickr.Instance;
	private valueChange!: stream<void>;

	public oncreate({ dom, attrs: { field: { max, min }, value } }: CVnodeDOM<IPropWidget>) {
		// Position picker relative to parent & left/right screen half
		const container = dom.parentElement as HTMLElement;
		const { left, right } = container.getBoundingClientRect();
		this.flatpickr = flatpickr(dom, {
			positionElement: container,
			position: left + right < window.innerWidth ? "below left" : "below right",
			disableMobile: true,
			minDate: min,
			maxDate: max,
			onChange: ([newDate]) => {
				if (newDate) {
					value(getYmd(newDate).join("-"));
					m.redraw();
				}
			}
		});
		// Sync value change with flatpickr
		this.valueChange = value.map((newVal) => {
			const date = new Date(String(newVal));
			if (isNaN(date.valueOf())) {
				this.flatpickr.clear();
			} else {
				this.flatpickr.setDate(date, false);
			}
		});
	}

	// Consider updating min/max attrs in onupdate event

	public onremove() {
		this.flatpickr.destroy();
		this.valueChange.end(true);
	}

	public view({ attrs: { field: { config } } }: CVnode<IPropWidget>) {
		return getIcon(getConfig("datePickerIcn", config), "ph-2px pv-1px");
	}

}
