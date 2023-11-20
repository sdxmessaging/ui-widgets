import m, { CVnode, ClassComponent } from "mithril";
import stream from "mithril/stream";
import { getConfig, getIcon } from "../config";
import { IConfig } from "../interface/config";
import { theme } from "../theme";

interface ITimeScroller {
	readonly value: stream<string>;
	readonly min: number;
	readonly max: number;
	readonly step?: number;
	readonly config?: Partial<IConfig>;
}

export class TimeScroller implements ClassComponent<ITimeScroller> {

	private static formatValue(value: stream<string>) {
		const val = value();
		return val != null
			? val.padStart(2, "0").slice(0, 2)
			: "-";
	}

	private static applyStep(value: stream<string>, step: number, min: number, max: number) {
		const numVal = Number(TimeScroller.formatValue(value));
		const safeVal = isNaN(numVal) ? min : numVal;
		// Apply step if within bounds
		const stepVal = safeVal + step;
		const newVal = (stepVal < min || stepVal > max) ? safeVal : stepVal;
		value(newVal.toString());
	}

	public view({ attrs: { value, step = 1, min, max, config } }: CVnode<ITimeScroller>) {
		return m(".flex.flex-column.items-center", [
			m(".pointer", {
				onclick: () => TimeScroller.applyStep(value, step, min, max)
			},
				getIcon(getConfig("timeScrollerUpIcn", config), "")
			),
			m("span.mv2.w-100.mw-dd.tc.f6.fw6", {
				class: theme.timeInputScrollerNumber
			}, TimeScroller.formatValue(value)),
			m(".pointer", {
				onclick: () => TimeScroller.applyStep(value, -step, min, max)
			},
				getIcon(getConfig("timeScrollerDownIcn", config), "")
			)
		]);
	}

}
