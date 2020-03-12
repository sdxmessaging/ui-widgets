import m, { ClassComponent, CVnode } from "mithril";

import { IMithrilEvent } from "./interface/widget";
import { getIcon, btnClass } from "./theme";
import { getEnabledClass } from "./utils";

export interface IButton {
	readonly label?: string;
	readonly type?: "submit" | "reset" | "button";
	readonly title?: string;
	readonly icon?: string;
	readonly classes?: string;
	readonly disabled?: boolean;
	readonly style?: object;
	onclick?(evt: IMithrilEvent): void;
}

export class Button implements ClassComponent<IButton> {

	public view({ attrs: {
		label, type = "button", title = label, icon, classes = "", disabled, style, onclick
	} }: CVnode<IButton>) {
		return m("button.button-reset", {
			type, title, disabled,
			class: `${getEnabledClass(disabled)} ${btnClass()} ${classes}`, style,
			onclick
		},
			icon ? m("i.fa-fw", {
				class: `${label ? "mr2" : ""} ${getIcon(icon)}`
			}) : null,
			label
		);
	}

}
