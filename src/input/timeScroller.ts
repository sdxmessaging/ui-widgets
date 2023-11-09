import m, { CVnode, ClassComponent } from "mithril";
import { TPropStream } from "../interface/widget";
import { theme } from "../theme";

interface ITimeScroller {
	readonly value: TPropStream;
	readonly min: number;
	readonly max: number;
	readonly step?: number;
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

	public view({ attrs: { value, step = 1, min, max } }: CVnode<ITimeScroller>) {
		return m(".flex.flex-column.items-center", [
			m(".fas.fa-chevron-up.pointer", {
				onclick: () => TimeScroller.applyStep(value, step, min, max)
			}),
			m("span.mv2.w-100.mw-dd.tc.f6.fw6", {
				class: theme.timeInputScrollerNumber
			}, TimeScroller.formatValue(value)),
			m(".fas.fa-chevron-down.pointer", {
				onclick: () => TimeScroller.applyStep(value, -step, min, max)
			})
		]);
	}

}
