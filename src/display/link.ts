import m, { ClassComponent, CVnode } from "mithril";

import { FieldType, IPropWidget, TProp } from "../interface/widget";

import { config } from "../config";
import { theme, wrapperCls } from "../theme";
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

	public view({ attrs: { field } }: CVnode<IPropWidget>) {
		const { label, type = FieldType.url, uiClass = {} } = field;
		return m(".pa2.flex.flex-wrap", {
			class: wrapperCls(uiClass),
		}, [
			getDisplayLabel(label, type)
		]);
	}

}
