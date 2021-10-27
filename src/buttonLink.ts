import m, { ClassComponent, CVnode } from "mithril";

import { IButtonLink } from "./interface/widget";

import { getButtonContext, theme } from "./theme";
import { labelIcon } from "./utils";

export class ButtonLink implements ClassComponent<IButtonLink> {

	public view({ attrs: {
		label, title = label, icon, rightIcon,
		href, rel, target, download,
		context, classes = "", style
	} }: CVnode<IButtonLink>) {
		return m("a.link.flex.items-center", {
			href, rel, target, download, title,
			class: `${classes} ${getButtonContext(context)} ${theme.button}`,
			style
		}, labelIcon(icon, label, rightIcon));
	}

}
