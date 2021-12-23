import m, { ClassComponent, CVnode } from "mithril";

import { IButtonLink } from "./interface/widget";

import { theme } from "./theme";
import { labelIcon } from "./utils";

export class NavLink implements ClassComponent<IButtonLink> {

	public view({ attrs: {
		label = "", title = label, icon, rightIcon,
		href, rel, target, download,
		classes = "", style
	} }: CVnode<IButtonLink>) {
		return m("a.link.mh2.pa2.truncate", {
			href, rel, target, download, title,
			class: `${classes} ${theme.navButton}`,
			style
		}, labelIcon({text: label, icon, rightIcon}));
	}

}
