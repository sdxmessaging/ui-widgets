import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";
import { IConfig, TSubset } from "../interface/config";

import { config } from "../config";
import { theme, wrapperCls } from "../theme";
import { getDisplayLabel } from "../utils";

import { CheckLabel } from "./checkLabel";

export class Checkbox implements ClassComponent<IPropWidget> {

	protected readonly onIcon: keyof TSubset<IConfig, string> = "checkIcn";
	protected readonly offIcon: keyof TSubset<IConfig, string> = "uncheckIcn";

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { label, uiClass = {} } = field;
		return m(".pa2.flex.items-center", {
			class: wrapperCls(uiClass),
		}, [
			getDisplayLabel(label),
			m("i", {
				class: `${theme.displayValue} ${config[value() ? this.onIcon : this.offIcon]}`
			}),
			m(CheckLabel, { field, value })
		]);
	}

}
