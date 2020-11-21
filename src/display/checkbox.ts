import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";
import { IConfig, TSubset } from "../interface/config";

import { config } from "../config";
import { classMap, dspLblCls, getIcon } from "../theme";
import { getDisplayLabel } from "../utils";

import { CheckLabel } from "./checkLabel";

export class Checkbox implements ClassComponent<IPropWidget> {

	protected onIcon: keyof TSubset<IConfig, string> = "checkIcn";
	protected offIcon: keyof TSubset<IConfig, string> = "uncheckIcn";

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { label, classes = "", style } = field;
		return m(".pa2.flex.items-center", {
			class: `${classes} ${classMap.dspBrd()} ${dspLblCls()}`,
			style
		}, [
			getDisplayLabel(label),
			m("i", {
				class: `${classMap.inpCol()} ${getIcon(config[value() ? this.onIcon : this.offIcon])}`
			}),
			m(CheckLabel, { field, value })
		]);
	}

}
