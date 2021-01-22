import { IOption } from "./widget";

export interface IConfig {
	/** Maximum size for upload image in px */
	imageMaxSize: number;
	/** Display height of pending images as CSS size */
	imageDispHeight: string;
	/** Display height of thumbnail images as CSS size */
	thumbDispHeight: string;
	/** Single file input label */
	addFileTxt: string;
	/** Multiple file input label */
	addFilesTxt: string;
	/** File remove tooltip */
	remFileTtl: string;
	/** Open file path label */
	openFileTxt: string;
	/** Password display toggle label */
	showPassTxt: string;
	/** Text to append to widget labels when field is required */
	requiredLblPost: string;
	/** Default options for signature creator */
	signOpts: IOption[];
	/** Maximum size for signature image in px */
	signMaxSize: number;
	/** Height of signature widget as percentage of width */
	signHeightPct: number;
	/** Signature type/stamp font */
	signFont: string;
	/** Signature "Draw" button caption */
	signDrawTxt: string;
	/** Signature "Type" button caption */
	signTypeTxt: string;
	/** Signature "Stamp" button caption */
	signStampTxt: string;
	/** Signature "Stamp" button label */
	stampTxt: string;
	/** Signature "Stamp" button class */
	stampBtnClass: string,
	/** Signature "Stamp" button context */
	stampBtnContext: string,
	/** Signature "Stamp" application canvas text */
	stampSetTxt: string;
	/** Signature "Apply" button tooltip */
	applyTtl: string;
	/** Signature "Reset" button tooltip */
	resetTtl: string;
	/** Signature "Cancel" button tooltip */
	cancelTtl: string;
	/** Signature "Draw" button icon */
	drawIcn: string;
	/** Signature "Type" button icon */
	typeIcn: string;
	/** Signature "Stamp" button icon */
	stampIcn: string;
	applyIcn: string;
	resetIcn: string;
	cancelIcn: string;
	checkIcn: string;
	uncheckIcn: string;
	toggleOnIcn: string;
	toggleOffIcn: string;
	showPassIcn: string;
	hidePassIcn: string;
	uploadIcn: string;
	downloadIcn: string;
	deleteIcn: string;
	cameraIcn: string;
	imageIcn: string;
	emailIcn: string;
	telIcn: string;
	linkIcn: string;
	/** File Type Icons for file upload widget */
	wordDocIcn: string;
	videoFileIcn: string;
	pdfFileIcn: string;
	musicFileIcn: string;
	excelFileIcn: string;
	fileIcn: string;
	codeFileIcn: string;
}

/**
 * Pick keys from T where their respective value extends U
 */
export type TSubset<T, U> = Pick<T, {
	[Key in keyof T]: T[Key] extends U ? Key : never
}[keyof T]>
