import m, { ClassComponent, CVnode } from "mithril";

import { IMithrilEvent } from "./interface/widget";
import { getIcon, getButtonContext } from "./theme";
import { getEnabledClass } from "./utils";

export interface IButton {
	readonly label?: string;
	readonly type?: "submit" | "reset" | "button";
	readonly title?: string;
	readonly icon?: string;
	readonly context?: string;
	readonly classes?: string;
	readonly disabled?: boolean;
	readonly style?: object;
	onclick?(evt: IMithrilEvent): void;
}

export class Button implements ClassComponent<IButton> {

	public view({ attrs: {
		label, type = "button", title = label, icon, context, classes = "", disabled, style, onclick
	} }: CVnode<IButton>) {
		return m("button.button-reset", {
			type, title, disabled,
			class: `${getEnabledClass(disabled)} ${getButtonContext(context)} ${classes}`, style,
			onclick
		},
			icon ? m("i.fa-fw", {
				class: `${label ? "mr2" : ""} ${getIcon(icon)}`
			}) : null,
			label
		);
	}

}
