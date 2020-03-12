import m, { ClassComponent, CVnode } from "mithril";

import { IButtonLink } from "./buttonLink";

import { getIcon, navClass } from "./theme";

export class NavLink implements ClassComponent<IButtonLink> {

	public view({ attrs: {
		label, title = label, icon, href, rel, target, download, classes = "", style
	} }: CVnode<IButtonLink>) {
		return m("a.link.mh2.pa2.truncate", {
			href, rel, target, download, title,
			class: `${navClass()} ${classes}`, style
		},
			icon ? m("i.fa-fw", {
				class: `${label ? "mr2" : ""} ${getIcon(icon)}`
			}) : null,
			label
		);
	}

}
