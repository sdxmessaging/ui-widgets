import m, { ClassComponent, CVnode } from "mithril";

import { FieldType, IPropWidget, TProp } from "../interface/widget";

import { config as configMap, getConfig } from "../config";
import { theme, wrapperCls } from "../theme";
import { getDisplayLabel } from "../utils";
import { IConfig } from "..";

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

/** @deprecated Use `linkIcon` method */
export const iconMap: Record<string, string> = {
	email: configMap.emailIcn,
	tel: configMap.telIcn
};

export function linkIcon(type: FieldType | string, override?: Partial<IConfig>) {
	if (type === FieldType.email) {
		return getConfig("emailIcn", override);
	} else if (type === FieldType.tel) {
		return getConfig("telIcn", override);
	} else {
		return getConfig("linkIcn", override);
	}
}

export class Link implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const { label, type = FieldType.url, uiClass = {}, config } = field;
		return m(".pa2.flex.flex-wrap", {
			class: wrapperCls(uiClass),
		}, [
			getDisplayLabel(label),
			m("a.link.dim.pointer.ws-normal", linkAttrs(type, value()),
				m("i.mr2", {
					class: linkIcon(type, config)
				}),
				value()
			)
		]);
	}

}
