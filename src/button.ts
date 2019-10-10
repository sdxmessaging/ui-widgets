import m, { ClassComponent, CVnode } from "mithril";

import { getIcon, btnClass } from "./theme";

interface IButton {
	readonly label?: string;
	readonly type?: "submit" | "reset" | "button";
	readonly title?: string;
	readonly icon?: string;
	readonly classes?: string;
	readonly disabled?: boolean;
	readonly style?: object;
	onclick?(): void;
}

export class Button implements ClassComponent<IButton> {

	public view({ attrs: {
		label, type = "button", title = label, icon, classes, disabled, style, onclick
	} }: CVnode<IButton>) {
		return m("button.button-reset.pa2", {
			type,
			title,
			disabled,
			class: `${disabled ? "o-60" : "dim pointer"} ${btnClass()} ${classes}`,
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
