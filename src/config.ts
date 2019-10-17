import lodash from "lodash";

import { IConfig, TConfig } from "./interface/config";

export const confMap: IConfig = {
	// File inputs
	addFileTxt: "Upload...",
	addFilesTxt: "Add file(s)...",
	remFileTtl: "Remove",
	// Password input
	showPassTxt: "Show Password",
	// Signature
	signDrawTxt: "Draw",
	signTypeTxt: "Type",
	signStampTxt: "Accept",
	applyTtl: "Apply",
	resetTtl: "Reset",
	cancelTtl: "Cancel",
	// Icons
	drawIcn: "fa-pen-nib",
	typeIcn: "fa-keyboard",
	stampIcn: "fa-stamp",
	applyIcn: "fa-check",
	resetIcn: "fa-eraser",
	cancelIcn: "fa-times",
	checkIcn: "fa-check-square",
	uncheckIcn: "fa-square",
	uploadIcn: "fa-file-upload",
	downloadIcn: "fa-file-download",
	deleteIcn: "fa-trash-alt",
	cameraIcn: "fa-camera",
	imageIcn: "fa-image",
	emailIcn: "fa-envelope",
	telIcn: "fa-phone",
	linkIcn: "fa-link"
};

export const config: TConfig = confMap;

export function updateConfig(newConfig: Partial<IConfig>) {
	lodash.assign(confMap, newConfig);
}
