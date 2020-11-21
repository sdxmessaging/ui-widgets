import m, { ClassComponent, CVnode } from "mithril";

import { getButtonContext } from "./theme";
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
	readonly style?: Record<string, unknown>;
}

export class ButtonLink implements ClassComponent<IButtonLink> {

	public view({ attrs: {
		label, title = label, icon, rightIcon, href, rel, target, download, context, classes = "", style
	} }: CVnode<IButtonLink>) {
		return m("a.link", {
			href, rel, target, download, title,
			class: `${classes} ${getButtonContext(context)}`, style
		}, labelIcon(icon, label, rightIcon));
	}

}
