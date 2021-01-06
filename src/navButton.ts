import m, { ClassComponent, CVnode } from "mithril";

import { IButton } from "./button";

import { getEnabledClass, theme } from "./theme";
import { labelIcon } from "./utils";

export class NavButton implements ClassComponent<IButton> {

	public view({ attrs: {
		label, title = label, icon, rightIcon, classes = "", disabled, style, onclick
	} }: CVnode<IButton>) {
		return m(".mh2.pa2.truncate", {
			title, disabled,
			class: `${classes} ${getEnabledClass(disabled)} ${theme.navButton}`, style,
			onclick
		}, labelIcon(icon, label, rightIcon));
	}

}
