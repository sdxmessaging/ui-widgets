import m, { ClassComponent, CVnode } from "mithril";

import { getIcon, getTheme } from "./utils";

interface IButton {
	readonly label: string;
	readonly type?: "submit" | "reset" | "button";
	readonly icon?: string;
	readonly classes?: string;
	readonly disabled?: boolean;
	readonly style?: object;
	onclick?(): void;
}

export class Button implements ClassComponent<IButton> {

	public view({ attrs: {
		label, type = "button", icon, classes, disabled, style, onclick
	} }: CVnode<IButton>) {
		return m("button.button-reset.pa2.bn.br2", {
			type,
			class: `${disabled ? "o-60 " : "dim pointer "}${getTheme(["btnBg", "btnTxt"])} ${classes}`,
			disabled,
			style,
			onclick,
		},
			icon ? m("i.fa-fw.mr2", {
				class: getIcon(icon)
			}) : null,
			label
		);
	}

}
