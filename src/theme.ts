import lodash from "lodash";
import stream from "mithril/stream";

import { ITheme, TThemeKey, TThemeUpdate } from "./interface/theme";
import { config } from "./config";

// Class/Theme helpers
export function imgMaxSize() {
	return { "max-height": config.imageDispHeight };
}
export function thumbMaxSize() {
	return { "max-height": config.thumbDispHeight };
}

export const styleSm = { "max-width": "5.4ex" };
export const styleLg = { "max-width": "9ex" };

export const classMap: ITheme = {
	icon: stream("fas"),
	// Label
	lblCol: stream("silver"),
	lblFnt: stream("f6"),
	// Display
	dspFnt: stream("truncate"),
	dspBrd: stream("bb b--black-20"),
	// Input
	inpHgt: stream("h2"),
	inpCol: stream("dark-gray"),
	inpFnt: stream("fw2"),
	inpBrd: stream("bn"),
	// Active (radio/check)
	actCol: stream("dark-gray"),
	actBg: stream("bg-light-blue"),
	// File/Hover
	filBrd: stream("ba bw1 br3 b--dashed"),
	filBrdCol: stream("b--black-30"),
	drgCol: stream("blue"),
	drgBrdCol: stream("b--blue"),
	// Button
	btnBg: stream("bg-light-blue"),
	btnCol: stream("dark-gray"),
	btnFnt: stream(""),
	btnPad: stream("pa2"),
	btnBrd: stream("bn br2")
};

// Merge theme entries into widget class helpers
function joinCls(classes: string[]) {
	return classes.join(" ");
}
function compositeClass(keys: ReadonlyArray<TThemeKey>, streams: ReadonlyArray<stream<string>> = []): stream<string> {
	return stream
		.merge(lodash.concat(lodash.map(keys, (key) => classMap[key]), streams))
		.map(joinCls);
}

// Display labels
export const dspLblCls = compositeClass(["lblCol", "dspFnt"]);
// Input labels
export const lblCls = compositeClass(["lblCol", "lblFnt"]);
// Non-text input font
export const txtCls = compositeClass(["inpCol", "inpFnt"]);
// Textarea font
export const areaCls = compositeClass(["inpBrd"], [txtCls]);
// Typical input
export const inpCls = compositeClass(["inpHgt"], [areaCls]);
// Active radio
export const actCls = compositeClass(["actCol", "actBg"]);
// File border
export const filCls = compositeClass(["filBrd", "filBrdCol"], [txtCls]);
// File dragover border
export const drgCls = compositeClass(["inpFnt", "filBrd", "drgCol", "drgBrdCol"]);
// Global button
export const btnClass = compositeClass(["btnBg", "btnCol", "btnFnt", "btnPad", "btnBrd"]);
// Nav button
export const navClass = compositeClass(["btnCol", "btnFnt"]);

export function updateTheme(newTheme: Partial<TThemeUpdate>) {
	lodash.forEach(newTheme, (value, key) => {
		if (value && key in classMap) {
			classMap[key as TThemeKey](value);
		}
	});
}

export function getIcon(iconClass: string): string {
	return `${classMap.icon()} ${iconClass}`;
}

// export function getFileType(extension: string) {
// 	console.log(extension);
// }

// Button context helpers
const btnMap: Record<string, string> = {};

export function updateButtonContext(newButtonContext: Record<string, string>) {
	lodash.assign(btnMap, newButtonContext);
}

export function getButtonContext(key?: string): string {
	if (key && key in btnMap) {
		return btnMap[key];
	} else {
		return btnClass();
	}
}
