import m, { ClassComponent, CVnode } from "mithril";

import { getButtonContext, theme } from "./theme";
import { labelIcon } from "./utils";

export interface IButtonLink {
	readonly label?: string;
	readonly title?: string;
	readonly icon?: string;
	readonly rightIcon?: string;
	readonly href?: string;
	readonly rel?: string;
	readonly target?: "_self" | "_blank" | "_parent" | "_top";
	readonly download?: string;
	readonly classes?: string;
	readonly context?: string;
}

export class ButtonLink implements ClassComponent<IButtonLink> {

	public view({ attrs: {
		label, title = label, icon, rightIcon, href, rel, target, download, context, classes = ""
	} }: CVnode<IButtonLink>) {
		return m("a.link.flex.items-center", {
			href, rel, target, download, title,
			class: `${classes} ${getButtonContext(context)} ${theme.button}`
		}, labelIcon(icon, label, rightIcon));
	}

}
