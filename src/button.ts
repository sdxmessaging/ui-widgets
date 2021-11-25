import m, { ClassComponent, CVnode } from "mithril";

import { IButton } from "./interface/widget";

import { getButtonContext, theme } from "./theme";
import { labelIcon } from "./utils";

export class Button implements ClassComponent<IButton> {

	public view({ attrs: {
		label, type = "button", title = label, icon, rightIcon,
		context, classes = "", style,
		disabled, onclick, tabindex
	} }: CVnode<IButton>) {
		return m("button.button-reset", {
			type, title, disabled,
			class: `${classes} ${disabled ? theme.disabledWrapper : "pointer"} ${getButtonContext(context)} ${theme.button}`,
			style, tabindex,
			onclick
		}, labelIcon(icon, label, rightIcon));
	}

}
