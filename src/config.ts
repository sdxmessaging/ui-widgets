import lodash from "lodash";
import m from "mithril";

import { IConfig, TIcon, TWidgetFunction } from "./interface/config";
import { LayoutType, SignTypes } from "./interface/widget";
import { joinClasses } from "./theme";

const confMap: IConfig = {
	layoutType: LayoutType.default,
	tooltipIcon: "fas fa-info",
	imageMaxSize: 1280,
	addFileTxt: "Upload...",
	addFilesTxt: "Add file(s)...",
	remFileTtl: "Remove",
	openFileTxt: "Open file",
	showPassTxt: "Show Password",
	requiredLblPost: "",
	optionalLblPost: "",
	dateLocale: "default",
	datePickerIcn: "fas fa-calendar",
	signOpts: [SignTypes.Draw, SignTypes.Type, SignTypes.Stamp],
	signMaxSize: 640,
	signHeightPct: 25,
	signFont: "sans-serif",
	signDrawTxt: "Draw",
	signTypeTxt: "Type",
	signStampTxt: "Accept",
	stampTxt: "Accept",
	stampBtnClass: "",
	stampBtnContext: "default",
	stampSetTxt: "Accepted",
	applyTtl: "Apply",
	resetTtl: "Reset",
	cancelTtl: "Cancel",
	drawIcn: "fas fa-signature",
	typeIcn: "fas fa-keyboard",
	stampIcn: "fas fa-check",
	applyIcn: "fas fa-check",
	resetIcn: "fas fa-eraser",
	cancelIcn: "fas fa-times",
	// Currency, Percentage
	badgePosition: "left",
	currencySymbol: "$",
	negativeStyle: "default",
	// Check, toggle, radio all use common "selection" config options
	selectionLayout: ["icon", "label"],
	selectionOnLabel: "",
	selectionOffLabel: "",
	selectionOnActive: "",
	selectionOffActive: "",
	selectionOnInactive: "dn",
	selectionOffInactive: "dn",
	checkIcn: "far fa-check-square",
	uncheckIcn: "far fa-square",
	toggleOnWrapper: "br-pill bg-light-blue",
	toggleOffWrapper: "br-pill bg-silver",
	toggleOnIcn: "br-100 bg-white",
	toggleOffIcn: "br-100 bg-white",
	radioOnIcn: "fas fa-circle-dot",
	radioOffIcn: "fas fa-circle",
	showPassIcn: "fas fa-eye",
	hidePassIcn: "fas fa-eye-slash",
	uploadIcn: "fas fa-file-upload",
	downloadIcn: "fas fa-file-download",
	deleteIcn: "fas fa-trash-alt",
	cameraIcn: "fas fa-camera",
	imageIcn: "fas fa-image",
	emailIcn: "fas fa-envelope",
	telIcn: "fas fa-phone",
	linkIcn: "fas fa-link",
	wordDocIcn: "fas fa-file-word",
	videoFileIcn: "fas fa-file-video",
	pdfFileIcn: "fas fa-file-pdf",
	musicFileIcn: "fas fa-file-audio",
	excelFileIcn: "fas fa-file-excel",
	fileIcn: "fas fa-file",
	codeFileIcn: "fas fa-file-code"
};

export const config: Readonly<IConfig> = confMap;

export function updateConfig(newConfig: Partial<IConfig>) {
	lodash.assign(confMap, newConfig);
}

export function getConfig<T extends keyof IConfig>(key: T, override?: Partial<IConfig>) {
	return override && key in override
		? override[key] as IConfig[T]
		: config[key];
}

const functionMap: Record<string, TWidgetFunction> = {};

export function registerFunction(name: string, func: TWidgetFunction) {
	if (name in functionMap) {
		throw new Error(`Function ${name} already registered.`);
	}
	functionMap[name] = func;
}

export function getFunction(name: string) {
	if (!(name in functionMap)) {
		throw new Error(`Function ${name} not registered.`);
	}
	return functionMap[name];
}

export function getIcon(icon: TIcon, classes: string) {
	if (typeof icon === "string") {
		return m("i", { class: joinClasses([classes, icon]) });
	} else {
		return getFunction(icon.name)(icon.data, classes);
	}
}
