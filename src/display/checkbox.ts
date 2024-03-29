import m, { ClassComponent, CVnode } from "mithril";

import { ICheckboxField, IPropWidget } from "../interface/widget";
import { IConfig, TIcon, TSubset } from "../interface/config";

import { getConfig } from "../config";
import { wrapperCls } from "../theme";
import { getDisplayLabel } from "../utils";

import { SelectionInner } from "../input/layout/selectionInner";

type TCheckboxWidget = IPropWidget<ICheckboxField>
export class Checkbox implements ClassComponent<TCheckboxWidget> {

	protected readonly onIcon: keyof TSubset<IConfig, TIcon> = "checkIcn";
	protected readonly offIcon: keyof TSubset<IConfig, TIcon> = "uncheckIcn";

	public view({ attrs: { field, value } }: CVnode<TCheckboxWidget>) {
		const { label, uiClass = {}, config } = field;
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
