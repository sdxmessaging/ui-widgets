import m, { Attributes } from "mithril";
import stream from "mithril/stream";

import { IFile, IWidgetLabel, TProp, TPropMap, TPropStream } from "./interface/widget";

import { joinClasses, labelCls, theme } from "./theme";
import { config } from "./config";
import { IWidgetClasses } from "./interface/theme";

// Create "v4-like" (no fixed version id) uuid (based on node-uuid)
function toHex(inp: number): string {
	// Add to 0x100 to pad small numbers with leading 0
	return (inp + 0x100).toString(16).substring(1);
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

export function titleFromLabel(label?: string | IWidgetLabel) {
	return label && (typeof label === "string" ? label : label.text);
}

export function getLabelText(label: string | IWidgetLabel, required?: boolean): string {
	const text = typeof label === "string" ? label : label.text;
	const post = required ? config.requiredLblPost : config.optionalLblPost;
	return post ? text + post : text;
}

export function getAltLabel({ alt }: IWidgetLabel) {
	return alt ? m("span", { class: theme.altLabel }, alt) : null;
}

export function imgSrc(path: string, dataUrl?: string): string {
	return dataUrl ? dataUrl : path;
}

function enrichLabel(
	label: IWidgetLabel, selector: string, attributes: Attributes, required?: boolean
) {
	return m(selector, attributes, [
		label.icon ? m("i", { class: label.icon }) : null,
		m("span", getLabelText(label, required)),
		getAltLabel(label),
		label.rightIcon ? m("i", { class: label.rightIcon }) : null,
		label.href ? m("a.link.dim.pointer.ws-normal.mh1", { onclick: label.onclick }, [
			m("i", { class: config.linkIcn }),
			label.href
		]) : null
	]);
}

// Used by display widgets
export function getDisplayLabel(label?: string | IWidgetLabel, labelCls = "mr2 truncate") {
	if (label) {
		if (typeof label === "string") {
			return m("span", {
				title: label,
				class: joinClasses([labelCls, theme.displayLabel])
			}, label);
		}
		else {
			return enrichLabel(label, "span", {
				title: label.text,
				class: joinClasses([labelCls, theme.displayLabel])
			});
		}
	}
	return null;
}

// Used by input widgets
export function getLabel(id: string, uiClass: IWidgetClasses, label?: string | IWidgetLabel, required?: boolean) {
	if (label) {
		if (typeof label === 'string') {
			return m("label.mb1.db", {
				title: label,
				for: id,
				class: labelCls(uiClass, required),
			}, getLabelText(label, required));
		}
		else {
			return enrichLabel(label, "label.mb1.db", {
				title: label.text,
				for: id,
				class: labelCls(uiClass, required),
			}, required);
		}
	}
	return null;
}

export function labelIcon(label: IWidgetLabel) {
	return [
		label.icon && m("i.fa-fw", {
			class: label.icon
		}),
		label.text && m("span", label.text),
		label.rightIcon && m("i.fa-fw", {
			class: label.rightIcon
		})
	];
}

// Input widget TProp update helpers
export function setValue(val: TPropStream) {
	return function ({ target: { value } }: { target: HTMLInputElement; }) {
		val(value);
	};
}

export function setCheck(val: TPropStream, checkValue?: TProp) {
	return checkValue != null
		? function ({ target: { checked } }: { target: HTMLInputElement; }) {
			val(checked ? checkValue : false);
		}
		: function ({ target: { checked } }: { target: HTMLInputElement; }) {
			val(checked);
		};
}

export function setIfDifferent<T>(inStream: stream<T>, val: T) {
	if (inStream() !== val) {
		inStream(val);
	}
}

/* Event handler helper, select all text in a given input target */
export function selectTarget({ target }: { target: HTMLInputElement; }) {
	target.select();
}

export function clickOnEnter({ key }: KeyboardEvent) {
	if (key === "Enter" && document.activeElement) {
		(document.activeElement as HTMLElement).click();
	}
}

/**
 * Split given file name from extension
 */
export function fileNameExtSplit(fileName: string): [string, string] {
	const extIdx = fileName.lastIndexOf(".");
	if (extIdx === -1) {
		return [fileName, ""];
	} else {
		return [fileName.substring(0, extIdx), fileName.substring(extIdx)];
	}
}

export function dataURItoBlob(dataURI: string): Blob {
	const [header, content] = dataURI.split(",");
	const bytes = header.indexOf("base64") >= 0 ?
		atob(content) :
		unescape(content);
	const attributes = header
		.substring(header.indexOf("data:") + 5)
		.split(";");
	const mimeType = attributes[0];
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
	return new File([blob], fileName, { type: blob.type });
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
