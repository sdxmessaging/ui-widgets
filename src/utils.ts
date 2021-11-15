import m from "mithril";

import { IFile, TPropMap, TPropStream } from "./interface/widget";

import { labelCls, theme } from "./theme";
import { config } from "./config";
import { IWidgetClasses } from "./interface/theme";
import stream from "mithril/stream";
import { DateTime } from "luxon";

// Create "v4-like" (no fixed version id) uuid (based on node-uuid)
function toHex(inp: number): string {
	// Add to 0x100 to pad small numbers with leading 0
	return (inp + 0x100).toString(16).substr(1);
}
export function guid(): string {
	const bytes = new Uint8Array(16);
	const crypto = window.crypto;
	crypto.getRandomValues(bytes);
	return ([
		toHex(bytes[0]), toHex(bytes[1]),
		toHex(bytes[2]), toHex(bytes[3]), "-",
		toHex(bytes[4]), toHex(bytes[5]), "-",
		toHex(bytes[6]), toHex(bytes[7]), "-",
		toHex(bytes[8]), toHex(bytes[9]), "-",
		toHex(bytes[10]), toHex(bytes[11]),
		toHex(bytes[12]), toHex(bytes[13]),
		toHex(bytes[14]), toHex(bytes[15])
	]).join("");
}

export function pxRatio() {
	return Math.max(window.devicePixelRatio, 1);
}

export function getLabelText(label: string, required?: boolean): string {
	return required ? `${label}${config.requiredLblPost}` : label;
}

export function imgSrc(path: string, dataUrl?: string): string {
	return dataUrl ? dataUrl : path;
}

// Used by display widgets
export function getDisplayLabel(label?: string) {
	return label ? m("span.mr2.truncate", {
		title: label,
		class: theme.displayLabel
	}, label) : null;
}

// Used by input widgets
export function getLabel(id: string, uiClass: IWidgetClasses, label?: string, required?: boolean) {
	return label ? m("label.mb1.db", {
		title: label,
		for: id,
		class: labelCls(uiClass, required),
	}, getLabelText(label, required)) : null;
}

export function labelIcon(leftIcon?: string, label?: string, rightIcon?: string) {
	return [
		leftIcon ? m("i.fa-fw", {
			class: `${label ? "mr2" : ""} ${leftIcon}`
		}) : null,
		label,
		rightIcon ? m("i.fa-fw", {
			class: `${label ? "ml2" : ""} ${rightIcon}`
		}) : null
	];
}

// Input widget TProp update helpers
export function setValue(val: TPropStream) {
	return function ({ target: { value } }: { target: HTMLInputElement }) {
		val(value);
	};
}

export function setCheck(chk: TPropStream) {
	return function ({ target: { checked } }: { target: HTMLInputElement }) {
		chk(checked);
	};
}

export type TDateInputType = "dd" | "mm" | "yyyy" | "yy";
export type TDateType = 'day' | 'month' | 'year';

export function dateInputIds(type: TDateType) {
	switch (type) {
		case 'day': return 'dd';
		case 'month': return 'mm';
		case 'year': return 'yyyy';
	}
}
export function focusLastInput(dom: Element, id: string, focusedId: TDateInputType | undefined) {
	const lastFocused = dom.querySelector(`#${id}-${focusedId}`) as HTMLElement;
	lastFocused.focus();
}

// export function dateInRange(type: TDateInputType, first: number, second: number) {
// 	switch (type) {
// 		case "dd":
// 			return (isNaN(first) || first <= 3) && ((isNaN(second) || ((first === 3 && second <= 1))
// 				|| first < 3) && !(first === 0 && second === 0));
// 		// month from 01 to 12
// 		case "mm":
// 			return (isNaN(first) || first <= 1) && ((isNaN(second) || ((first === 1 && second <= 2))
// 				|| first < 1) && !(first === 0 && second === 0));
// 		// year has to start from 1 or above & min 1900
// 		case "yyyy":
// 			return (isNaN(first) || (first >= 1 && first < 3)) &&
// 				(isNaN(second) || ((first === 1 && second === 9)) || (first === 2));
// 		case "yy":
// 			return isNaN(first) || first >= 0;
// 	}
// }

export function updateDom(newDom: Element, currentDom: stream<Element>, validity: TPropStream) {
	if (newDom !== currentDom()) {
		const input = newDom.querySelector("input") as HTMLInputElement;
		setCustomValidityMessage(input, validity, "Invalid Date");
		currentDom(newDom);
	}
}

function setCustomValidityMessage(input: HTMLInputElement, validStream: TPropStream, message: string) {
	validStream.map((valid) => {
		const validityMessage = valid ? "" : `${message}`;
		input.setCustomValidity(validityMessage);
	});
}

function autoAdvance(id: string, self: HTMLInputElement, targetType: TDateInputType | undefined,
	streamValue: string, dom: Element) {

	const maxLength = parseInt(self.getAttribute("maxlength") as string);
	if (streamValue.length === maxLength && targetType) {
		const nextInput = dom.querySelector(`#${id}-${targetType}`) as HTMLInputElement;
		nextInput.focus();
		nextInput.select();
	}
}

export function autoRetreat(id: string, targetType: TDateInputType | undefined,
	streamValue: string, dom: Element, event: KeyboardEvent) {

	const prevInput = dom.querySelector(`#${id}-${targetType}`) as HTMLInputElement;
	if ((event.key === 'Backspace' || event.key === 'Delete') && streamValue.length === 0 && prevInput) {
		prevInput.focus();
		prevInput.select();
		// prevent event from passing to the previous field & deleting characters right away
		event.preventDefault();
	}
}

export function resetInvalidValueStream(date: string, year: string, month: string, day = "", required: boolean, valueStream?: TPropStream) {
	const valid = day ? validateDate(year, month, day, required) : validateCardDate(year, month, required);
	if (valueStream) {
		if (validDateInputLengths(year, month, day) && valid) {
			valueStream(date);
		}
		else {
			valueStream("");
		}
	}
}

export function appendZeroToDayMonth(valueStream: TPropStream) {
	const value = valueStream() as string;
	if (value.length === 1 && value !== '0') valueStream(`0${value}`);
}

export function validDateInputLengths(year: string, month: string, day = "") {
	const isCardDateInput = !day;
	const yearLength = isCardDateInput ? 2 : 4;
	return year.length === yearLength && month.length === 2 && (!day || day.length === 2);
}

export function validateDate(year: string, month: string, day: string, required: boolean) {
	const validation = DateTime.fromObject({
		year: Number(year),
		month: Number(month),
		day: Number(day)
	});
	const dateEmpty = !year && !month && !day;
	return (validation.isValid && Number(year) >= 1900) || (dateEmpty && !required);
}

export function validateCardDate(year: string, month: string, required: boolean) {
	// TODO validate year in the future if it is a valid_to input
	const dateEmpty = !year && !month;
	return (month.length === 2 && Number(month) <= 12 && Number(month) > 0 && year.length === 2)
		|| (dateEmpty && !required);
}

export function validateStyle(year: string, month: string, day = "", required: boolean) {
	// date input
	if (day) {
		return (day.length === 2 && month.length === 2
			&& year.length === 4 && !validateDate(year, month, day, required));
	}
	// card date input
	else {
		return (month.length === 2 && year.length === 2 && !validateCardDate(year, month, required));
	}
}

export function handleDateChange(streamType: TPropStream, id: string, selfType: TDateInputType,
	dom: Element, targetType?: TDateInputType) {

	const self = dom.querySelector(`#${id}-${selfType}`) as HTMLInputElement;
	const prevValue = streamType() ? streamType() : "";
	const value = self.value;
	const isNumeric = /^\d*$/.test(value);

	if ((isNumeric || value === "") && value.length <= 4) {
		streamType(value);
	}
	// preserve current/previous value when rules are broken
	else {
		streamType(prevValue);
	}

	autoAdvance(id, self, targetType, streamType() as string, dom);
}

/**
 * Split given file name from extension
 */
export function fileNameExtSplit(fileName: string): [string, string] {
	const extIdx = fileName.lastIndexOf(".");
	if (extIdx === -1) {
		return [fileName, ""];
	} else {
		return [fileName.substr(0, extIdx), fileName.substr(extIdx)];
	}
}

export function dataURItoBlob(dataURI: string): Blob {
	const dataUriList = dataURI.split(",");
	const bytes = dataUriList[0].indexOf("base64") >= 0 ?
		atob(dataUriList[1]) :
		unescape(dataUriList[1]);
	const mimeType = dataUriList[0].split(":")[1].split(";")[0];
	const bytesTotal = bytes.length;
	const byteArray = new Uint8Array(bytesTotal);
	for (let idx = 0; idx < bytesTotal; idx++) {
		byteArray[idx] = bytes.charCodeAt(idx);
	}
	return new Blob([byteArray], { type: mimeType });
}

/**
 * Convert a Blob into a "File-like" object without using the File constructor
 * Mutates input blob
 */
export function fileConstructor(blob: Blob, fileName: string) {
	const lastModified = new Date().valueOf();
	const mutableBlob = (blob as unknown) as TPropMap;
	mutableBlob.name = fileName;
	mutableBlob.lastModified = lastModified;
	return blob as File;
}

export function dataUrlToFile(dataUrl: string, name: string, metadata?: TPropMap): IFile {
	const newFile = fileConstructor(dataURItoBlob(dataUrl), name);
	return {
		guid: guid(),
		name: newFile.name,
		path: "not_set",
		file: newFile,
		dataUrl: dataUrl,
		metadata
	};
}


// // Firefox < 62 workaround exploiting https://bugzilla.mozilla.org/show_bug.cgi?id=1422655
// // specs compliant (as of March 2018 only Chrome)
// export function toFileList(fileList: IFile[]) {
// 	const transfer = new ClipboardEvent("").clipboardData || new DataTransfer();
// 	lodash.forEach(fileList, ({ file }) => {
// 		if (file) {
// 			transfer.items.add(file);
// 		}
// 	});
// 	return transfer.files;
// }

export function getFileTypeIcon(file: IFile) {
	const [, extension] = fileNameExtSplit(file.name);
	switch (extension.toLowerCase()) {
		case '.doc':
		case '.docx':
		case '.dot':
		case '.wbk':
		case '.docm':
		case '.dotx':
		case '.dotm':
		case '.docb':
		case '.txt':
			return config.wordDocIcn;
		case '.webm':
		case '.mkv':
		case '.flv':
		case '.vob':
		case '.ogv':
		case '.drc':
		case '.gifv':
		case '.mng':
		case '.avi':
		case '.mts':
		case '.m2ts':
		case '.mov':
		case '.qt':
		case '.wmv':
		case '.yuv':
		case '.rm':
		case '.rmvb':
		case '.viv':
		case '.asf':
		case '.amv':
		case '.mp4':
		case '.m4p':
		case '.m4v':
		case '.mpg':
		case '.mp2':
		case '.mpeg':
		case '.mpe':
		case '.mpv':
		case '.m2v':
		case '.svi':
		case '.3gp':
		case '.mxf':
		case '.roq':
		case '.nsv':
		case '.f4v':
		case '.f4p':
		case '.f4a':
		case '.f4b':
			return config.videoFileIcn;
		case '.pdf':
			return config.pdfFileIcn;
		case '.pcm':
		case '.wav':
		case '.aiff':
		case '.mp3':
		case '.aac':
		case '.ogg':
		case '.wma':
		case '.flac':
		case '.alac':
			return config.musicFileIcn;
		case '.xls':
		case '.xlt':
		case '.xlm':
		case '.xlsx':
		case '.xlsm':
		case '.xltx':
		case '.xltm':
		case '.xlsb':
		case '.xla':
		case '.xlam':
		case '.xll':
		case '.xlw':
			return config.excelFileIcn;
		case '.html':
		case '.js':
		case '.css':
		case '.scss':
		case '.java':
			return config.codeFileIcn;
		case '.jpg':
		case '.jpeg':
		case '.png':
		case '.tiff':
		case '.gif':
		case '.svg':
		case '.webp':
			return config.imageIcn;
		default:
			return config.fileIcn;
	}
}

export function isImage(fileType: string) {
	// Change to regex starts with "image/"
	return fileType && fileType.includes('image');
}
