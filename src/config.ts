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
	stampSetTxt: "Accepted",
	applyTtl: "Apply",
	resetTtl: "Reset",
	cancelTtl: "Cancel",
	drawIcn: "fa-pen-nib",
	typeIcn: "fa-keyboard",
	stampIcn: "fa-stamp",
	applyIcn: "fa-check",
	resetIcn: "fa-eraser",
	cancelIcn: "fa-times",
	checkIcn: "fa-check-square",
	uncheckIcn: "fa-square",
	toggleOnIcn: "fa fa-toggle-on",
	toggleOffIcn: "fa fa-toggle-off",
	showPassIcn: "fa fa-eye",
	hidePassIcn: "fa fa-eye-slash",
	uploadIcn: "fa-file-upload",
	downloadIcn: "fa-file-download",
	deleteIcn: "fa-trash-alt",
	cameraIcn: "fa-camera",
	imageIcn: "fa-image",
	emailIcn: "fa-envelope",
	telIcn: "fa-phone",
	linkIcn: "fa-link"
};

export const config: Readonly<IConfig> = confMap;

export function updateConfig(newConfig: Partial<IConfig>) {
	lodash.assign(confMap, newConfig);
}
