import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IPropWidget, TProp } from "../interface/widget";

import { BaseText } from "./baseText";

export class DateText implements ClassComponent<IPropWidget> {

	private formatted!: stream<TProp>;

	private formatter(val: TProp): TProp {
		return val ? new Date(String(val)).toLocaleDateString() : val;
	}

	public oninit({ attrs: { value } }: CVnode<IPropWidget>) {
		this.formatted = (value as stream<TProp>).map(this.formatter);
	}

	public onremove() {
		this.formatted.end(true);
	}

	public view({ attrs: { field } }: CVnode<IPropWidget>) {
		return m(BaseText, {
			field,
			value: this.formatted
		});
	}

}
