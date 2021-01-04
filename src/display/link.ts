import m, { ClassComponent, CVnode } from "mithril";

import { FieldType, IPropWidget, TProp } from "../interface/widget";

import { config } from "../config";
import { theme } from "../theme";
import { getDisplayLabel } from "../utils";

export function linkAttrs(fieldType: FieldType | string, value: TProp) {
	if (fieldType === "email") {
		return {
			href: `mailto:${value}`,
			class: theme.displayValue
		};
	} else if (fieldType === "tel") {
		return {
			href: `tel:${value}`,
			class: theme.displayValue
		};
	} else {
		// Assume standard urls
		return {
			href: value,
			target: "_blank",
			class: theme.displayValue
		};
	}
}

export const iconMap: Record<string, string> = {
	email: config.emailIcn,
	tel: config.telIcn
};

export class Link implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { label, type = FieldType.url, uiClass = {}, style } = field;
		const { wrapper = "" } = uiClass;
		return m(".pa2.flex.flex-wrap", {
			class: `${wrapper} ${theme.wrapper}`,
			style
		}, [
			getDisplayLabel(label),
			m("a.link.dim.pointer.ws-normal", linkAttrs(type, value()),
				m("i.mr2", {
					class: iconMap[type] || config.linkIcn
				}),
				value()
			)
		]);
	}

}
