import stream from "mithril/stream";
import lodash from "lodash";

import { ITheme, TThemeKey, TThemeUpdate } from "./interface/theme";

// Class/Theme helpers
export const signAspectRatio = {
	"padding-bottom": "25%"
};
export const imgMaxSize = {
	"max-height": "16rem"
};

const classMap: ITheme = {
	icon: stream("fas"),
	// Label
	lblCol: stream("silver"),
	lblFnt: stream("f6"),
	// Input
	inpHgt: stream("h2"),
	inpCol: stream("dark-gray"),
	inpFnt: stream("fw2"),
	inpBrd: stream("bn"),
	// Button
	btnBg: stream("bg-light-blue"),
	btnCol: stream("dark-gray"),
	btnFnt: stream(""),
	btnBrd: stream("bn br2")
};

// Merge theme entries into widget class helpers

// Input labels
export const lblCls = stream
	.merge([classMap.lblCol, classMap.lblFnt])
	.map((classes) => classes.join(" "));

// Non-text input font
export const txtCls = stream
	.merge([classMap.inpCol, classMap.inpFnt])
	.map((classes) => classes.join(" "));

// Textarea font
export const areaCls = stream
	.merge([classMap.inpBrd, txtCls])
	.map((classes) => classes.join(" "));

// Typical input
export const inpCls = stream
	.merge([classMap.inpHgt, areaCls])
	.map((classes) => classes.join(" "));

// Global button
export const btnClass = stream
	.merge([classMap.btnBg, classMap.btnCol, classMap.btnFnt, classMap.btnBrd])
	.map((classes) => classes.join(" "));

export function updateTheme(newTheme: Partial<TThemeUpdate>) {
	lodash.forEach(newTheme, (value, key) => {
		if (key in classMap) {
			classMap[key as TThemeKey](value || "");
		}
	});
}

// Deprecated
export function getTheme(keys: ReadonlyArray<TThemeKey>): string {
	return lodash(keys)
		.map((key) => classMap[key]())
		.value()
		.join(" ");
}

export function getIcon(iconClass: string): string {
	return `${classMap.icon()} ${iconClass}`;
}
