import m, { CVnode, CVnodeDOM, ClassComponent } from "mithril";
import stream from "mithril/stream";

import { theme } from "../theme";

import { IConfig } from "../interface/config";
import { TimeScroller } from "./timeScroller";

interface ITimePicker {
	readonly hour: stream<string>;
	readonly min: stream<string>;
	readonly step?: number;
	readonly config?: Partial<IConfig>;
	onClose(): void;
}

export class TimePicker implements ClassComponent<ITimePicker> {

	private dom!: HTMLElement;
	private clickListener!: (evt: MouseEvent) => void;

	public oncreate({ dom, attrs: { onClose: close } }: CVnodeDOM<ITimePicker>) {
		this.dom = dom as HTMLElement;
		this.clickListener = (evt: MouseEvent) => {
			if (evt.target && !this.dom.contains(evt.target as Node)) {
				close();
				m.redraw();
			}
		};
		document.addEventListener("click", this.clickListener);
	}

	public onremove() {
		document.removeEventListener("click", this.clickListener);
	}

	public view({ attrs: { hour, min, step, config } }: CVnode<ITimePicker>) {
		return m(".flex.items-center.absolute.z-max.us-none", {
			class: theme.timeInputScrollerWrapper
		}, [
			m(TimeScroller, {
				value: hour,
				min: 0, max: 23,
				config
			}),
			m("span.ph2.f6", ":"),
			m(TimeScroller, {
				value: min,
				min: 0, max: 59,
				step,
				config
			})
		]);
	}

}
