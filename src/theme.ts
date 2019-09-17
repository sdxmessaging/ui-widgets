import lodash from "lodash";

import { ITheme } from "./interface/style";

// Class/Theme helpers
export const inputBorder = "border-box bn";
export const inputText = "fw2 dark-gray";
export const labelCls = "mb1 f6 silver";
export const signAspectRatio = {
	"padding-bottom": "25%"
};
export const imgMaxSize = {
	"max-height": "16rem"
};

const classMap: ITheme = {
	icon: "fas",
	inpHgt: "h2",
	btnBg: "bg-light-blue",
	btnTxt: "dark-gray"
};

export function applyTheme(newTheme: Partial<ITheme>) {
	lodash.merge(classMap, newTheme);
}

export function getTheme(keys: Array<keyof ITheme>): string {
	return lodash(keys)
		.map((key) => classMap[key])
		.value()
		.join(" ");
}

export function getIcon(iconClass: string): string {
	return `${getTheme(["icon"])} ${iconClass}`;
}
