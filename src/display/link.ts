import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget, TProp } from "../interface/widget";

import { getDisplayLabel, getIcon } from "../utils";

export function linkAttrs(fieldType: string, value: TProp) {
	if (fieldType === "email") {
		return {
			href: `mailto:${value}`
		};
	} else if (fieldType === "tel") {
		return {
			href: `tel:${value}`
		};
	} else {
		// Assume standard urls
		return {
			href: value,
			target: "_blank"
		};
	}
}

export const iconMap: Record<string, string> = {
	email: "fa-envelope",
	tel: "fa-phone"
};

export class Link implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { classes, style } = field;
		return m(".pa2.flex.flex-wrap.bb.b--black-20", {
			class: classes,
			style
		}, [
			getDisplayLabel(field),
				value ?
					m("a.link.dark-gray.dim.pointer.ws-normal", linkAttrs(field.type, value()),
						m("i.mr2", {
							class: getIcon(iconMap[field.type] || "fa-link")
						}),
						value())
					: null
			]);
	}

}
