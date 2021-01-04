import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";
import { IConfig, TSubset } from "../interface/config";

import { config } from "../config";
import { theme } from "../theme";
import { getDisplayLabel } from "../utils";

import { CheckLabel } from "./checkLabel";

export class Checkbox implements ClassComponent<IPropWidget> {

	protected onIcon: keyof TSubset<IConfig, string> = "checkIcn";
	protected offIcon: keyof TSubset<IConfig, string> = "uncheckIcn";

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { label, uiClass = {}, style } = field;
		const { wrapper = "" } = uiClass;
		return m(".pa2.flex.items-center", {
			class: `${wrapper} ${theme.wrapper}`,
			style
		}, [
			getDisplayLabel(label),
			m("i", {
				class: `${theme.displayValue} ${config[value() ? this.onIcon : this.offIcon]}`
			}),
			m(CheckLabel, { field, value })
		]);
	}

}
