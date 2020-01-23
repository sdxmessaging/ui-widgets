import m, { ClassComponent, CVnode } from "mithril";

import { IMithrilEvent } from "./interface/widget";
import { getIcon } from "./theme";
import { getEnabledClass } from "./utils";

interface INavButton {
	readonly label?: string;
	readonly title?: string;
	readonly icon?: string;
	readonly classes?: string;
	readonly disabled?: boolean;
	readonly style?: object;
	onclick?(evt: IMithrilEvent): void;
}

export class NavButton implements ClassComponent<INavButton> {

	public view({ attrs: {
		label, title = label, icon, classes, disabled, style, onclick
	} }: CVnode<INavButton>) {
		return m(".mh2.pa2.truncate", {
			title,
			disabled,
			class: `${getEnabledClass(disabled)} ${classes}`,
			style,
			onclick,
		},
			icon ? m("i.fa-fw", {
				class: `${label ? "mr2" : ""} ${getIcon(icon)}`
			}) : null,
			label
		);
	}

}
