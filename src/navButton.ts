import m, { ClassComponent, CVnode } from "mithril";

import { IButton } from "./button";

import { getIcon, navClass } from "./theme";
import { getEnabledClass } from "./utils";

export class NavButton implements ClassComponent<IButton> {

	public view({ attrs: {
		label, title = label, icon, classes = "", disabled, style, onclick
	} }: CVnode<IButton>) {
		return m(".mh2.pa2.truncate", {
			title, disabled,
			class: `${getEnabledClass(disabled)} ${navClass()} ${classes}`, style,
			onclick
		},
			icon ? m("i.fa-fw", {
				class: `${label ? "mr2" : ""} ${getIcon(icon)}`
			}) : null,
			label
		);
	}

}
