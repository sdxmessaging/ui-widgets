import m, { ClassComponent, CVnode } from "mithril";

import { getIcon, btnClass } from "./theme";

export interface IButtonLink {
	readonly label?: string;
	readonly title?: string;
	readonly icon?: string;
	readonly href?: string;
	readonly rel?: string;
	readonly target?: "_self" | "_blank" | "_parent" | "_top";
	readonly download?: string;
	readonly classes?: string;
	readonly style?: object;
}

export class ButtonLink implements ClassComponent<IButtonLink> {

	public view({ attrs: {
		label, title = label, icon, href, rel, target, download, classes = "", style
	} }: CVnode<IButtonLink>) {
		return m("a.link", {
			href, rel, target, download, title,
			class: `${btnClass()} ${classes}`, style
		},
			icon ? m("i.fa-fw", {
				class: `${label ? "mr2" : ""} ${getIcon(icon)}`
			}) : null,
			label
		);
	}

}
