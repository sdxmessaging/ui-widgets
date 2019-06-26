declare const b: TBss;
import m, { ClassComponent, CVnode } from "mithril";

import { TBss } from "./interface/style";

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
		return m("button.button-reset.pa2.bn.br2" + b.bgBranding.brandingAlt, {
			type,
			class: `${disabled ? "o-60 " : ""}${classes}`,
			disabled,
			style,
			onclick,
		},
			icon ? m("i.fal.fa-fw.mr2", {
				class: icon
			}) : null,
			label
		);
	}

}
