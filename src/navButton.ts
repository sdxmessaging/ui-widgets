import m, { ClassComponent, CVnode } from "mithril";

import { IButton } from "./button";

import { theme } from "./theme";
import { labelIcon } from "./utils";

export class NavButton implements ClassComponent<IButton> {

	public view({ attrs: {
		label, title = label, icon, rightIcon, classes = "", disabled, onclick
	} }: CVnode<IButton>) {
		return m(".mh2.pa2.truncate", {
			title, disabled,
			class: `${classes} ${disabled ? theme.disabledWrapper : "pointer"} ${theme.navButton}`,
			onclick
		}, labelIcon(icon, label, rightIcon));
	}

}
