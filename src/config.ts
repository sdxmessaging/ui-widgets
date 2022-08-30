import lodash from "lodash";

import { IConfig } from "./interface/config";
import { LayoutType, SignTypes } from "./interface/widget";

const confMap: IConfig = {
	layoutType: LayoutType.default,
	imageMaxSize: 1280,
	addFileTxt: "Upload...",
	addFilesTxt: "Add file(s)...",
	remFileTtl: "Remove",
	openFileTxt: "Open file",
	showPassTxt: "Show Password",
	requiredLblPost: "",
	dateOpts: [],
	signOpts: [{
		label: "", value: SignTypes.Draw
	}, {
		label: "", value: SignTypes.Type
	}, {
		label: "", value: SignTypes.Stamp
	}],
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
	checkIcn: "far fa-check-square",
	uncheckIcn: "far fa-square",
	toggleOnIcn: "fas fa-toggle-on",
	toggleOffIcn: "fas fa-toggle-off",
	// Recreate doubleLabel parameter
	// toggleOffIcn: "fas fa-toggle-on fa-flip-horizontal",
	radioOnIcn: "fas fa-dot-circle",
	// Font awesome 6
	// radioOnIcn: "fas fa-circle-dot",
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
	codeFileIcn: "fas fa-file-code",
	currencyFormat: "default",
	toggleFormat: "default"
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
