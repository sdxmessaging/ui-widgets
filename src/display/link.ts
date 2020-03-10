import m, { ClassComponent, CVnode } from "mithril";

import { FieldType, IPropWidget, TProp } from "../interface/widget";

import { config } from "../config";
import { classMap, getIcon, txtCls } from "../theme";
import { getDisplayLabel } from "../utils";

export function linkAttrs(fieldType: FieldType | string, value: TProp) {
	if (fieldType === "email") {
		return {
			href: `mailto:${value}`,
			class: txtCls()
		};
	} else if (fieldType === "tel") {
		return {
			href: `tel:${value}`,
			class: txtCls()
		};
	} else {
		// Assume standard urls
		return {
			href: value,
			target: "_blank",
			class: txtCls()
		};
	}
}

export const iconMap: Record<string, string> = {
	email: config.emailIcn,
	tel: config.telIcn
};

export class Link implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { type = FieldType.url, classes = "", style } = field;
		return m(".pa2.flex.flex-wrap", {
			class: `${classMap.dspBrd()} ${classes}`,
			style
		}, [
			getDisplayLabel(field),
			m("a.link.dim.pointer.ws-normal", linkAttrs(type, value()),
				m("i.mr2", {
					class: getIcon(iconMap[type] || config.linkIcn)
				}),
				value())
		]);
	}

}
