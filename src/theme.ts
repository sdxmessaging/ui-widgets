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

export const classMap: ITheme = {
	icon: stream("fas"),
	// Label
	lblCol: stream("silver"),
	lblFnt: stream("f6"),
	// Display
	dspFnt: stream("truncate"),
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
function joinCls(classes: string[]) {
	return classes.join(" ");
}
function compositeClass(keys: ReadonlyArray<TThemeKey>): stream<string> {
	return stream.merge(lodash.map(keys, (key) => classMap[key])).map(joinCls);
}

// Input labels
export const lblCls = compositeClass(["lblCol", "lblFnt"]);
// Display labels
export const dspLblCls = compositeClass(["lblCol", "dspFnt"]);
// Non-text input font
export const txtCls = compositeClass(["inpCol", "inpFnt"]);
// Textarea font
export const areaCls = stream.merge([classMap.inpBrd, txtCls]).map(joinCls);
// Typical input
export const inpCls = stream.merge([classMap.inpHgt, areaCls]).map(joinCls);
// Global button
export const btnClass = compositeClass(["btnBg", "btnCol", "btnFnt", "btnBrd"])

export function updateTheme(newTheme: Partial<TThemeUpdate>) {
	lodash.forEach(newTheme, (value, key) => {
		if (key in classMap) {
			classMap[key as TThemeKey](value || "");
		}
	});
}

export function getIcon(iconClass: string): string {
	return `${classMap.icon()} ${iconClass}`;
}
