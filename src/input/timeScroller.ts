import m, { CVnode, ClassComponent } from "mithril";
import { IConfig } from "../interface/config";
import { TPropStream } from "../interface/widget";
import { theme } from "../theme";
import { getConfig, getIcon } from "../config";

interface ITimeScroller {
	readonly value: TPropStream;
	readonly min: number;
	readonly max: number;
	readonly step?: number;
	readonly config?: Partial<IConfig>;
}

export class TimeScroller implements ClassComponent<ITimeScroller> {

	private static formatValue(value: TPropStream) {
		const val = value();
		return val != null
			? String(value())
				.padStart(2, "0")
				.slice(0, 2)
			: "-";
	}

	private static applyStep(value: TPropStream, step: number, min: number, max: number) {
		const numVal = Number(TimeScroller.formatValue(value));
		const safeVal = isNaN(numVal) ? min : numVal;
		const clamped = Math.min(Math.max(safeVal + step, min), max);
		value(clamped.toString());
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
