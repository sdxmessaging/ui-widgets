import m, { ClassComponent, CVnode } from "mithril";

import { TStyle } from "./interface/theme";
import { IMithrilEvent } from "./interface/widget";
import { getButtonContext } from "./theme";
import { getEnabledClass, labelIcon } from "./utils";

export interface IButton {
	readonly label?: string;
	readonly type?: "submit" | "reset" | "button";
	readonly title?: string;
	readonly icon?: string;
	readonly rightIcon?: string;
	readonly context?: string;
	readonly classes?: string;
	readonly disabled?: boolean;
	readonly style?: TStyle;
	onclick?(evt: IMithrilEvent): void;
}

export class Button implements ClassComponent<IButton> {

	public view({ attrs: {
		label, type = "button", title = label, icon, rightIcon, context, classes = "", disabled, style, onclick
	} }: CVnode<IButton>) {
		return m("button.button-reset", {
			type, title, disabled,
			class: `${classes} ${getEnabledClass(disabled)} ${getButtonContext(context)}`, style,
			onclick
		}, labelIcon(icon, label, rightIcon));
	}

}
