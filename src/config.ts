import lodash from "lodash";

import { IConfig } from "./interface/config";
import { SignTypes } from "./interface/widget";

const confMap: IConfig = {
	imageMaxSize: 1280,
	imageDispHeight: "16rem",
	thumbDispHeight: "6rem",
	addFileTxt: "Upload...",
	addFilesTxt: "Add file(s)...",
	remFileTtl: "Remove",
	showPassTxt: "Show Password",
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
	drawIcn: "fas fa-pen-nib",
	typeIcn: "fas fa-keyboard",
	stampIcn: "fas fa-stamp",
	applyIcn: "fas fa-check",
	resetIcn: "fas fa-eraser",
	cancelIcn: "fas fa-times",
	checkIcn: "far fa-check-square",
	uncheckIcn: "far fa-square",
	toggleOnIcn: "fas fa-toggle-on",
	toggleOffIcn: "fas fa-toggle-off",
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
