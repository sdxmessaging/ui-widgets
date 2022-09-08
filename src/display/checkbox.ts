import m, { ClassComponent, CVnode } from "mithril";

import { ICheckboxField, IPropWidget } from "../interface/widget";
import { IConfig, TSubset } from "../interface/config";

import { getConfig } from "../config";
import { wrapperCls } from "../theme";
import { getDisplayLabel } from "../utils";

import { SelectionInner } from "../input/layout/selectionInner";

export class Checkbox implements ClassComponent<IPropWidget> {

	protected readonly onIcon: keyof TSubset<IConfig, string> = "checkIcn";
	protected readonly offIcon: keyof TSubset<IConfig, string> = "uncheckIcn";

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { label, uiClass = {}, config } = field as ICheckboxField;
		return m(".pa2", {
			class: wrapperCls(uiClass),
		}, m(SelectionInner, {
			selected: Boolean(value()),
			label: getDisplayLabel(label, "mh1 truncate"),
			onIcon: getConfig(this.onIcon, config),
			offIcon: getConfig(this.offIcon, config),
			config
		}));
	}

}
