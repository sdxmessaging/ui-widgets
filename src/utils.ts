import m from "mithril";
import stream from "mithril/stream";

import { TField, TProp } from "./interface/widget";

import { dspLblCls, lblCls } from "./theme";

declare global {
	// eslint-disable-next-line @typescript-eslint/interface-name-prefix
	interface Window { msCrypto: Crypto }
}

// Create "v4-like" (no fixed version id) uuid (based on node-uuid)
function toHex(inp: number): string {
	// Add to 0x100 to pad small numbers with leading 0
	return (inp + 0x100).toString(16).substr(1);
}
export function guid(): string {
	const bytes = new Uint8Array(16);
	const crypto = window.crypto || window.msCrypto;
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
	return required ? `${label}*` : label;
}

export function imgSrc(path: string, dataUrl?: string): string {
	return dataUrl ? dataUrl : path;
}

// Used by display widgets
// TODO Consolidate with getLabel
export function getDisplayLabel({ label }: TField) {
	return label ? m("span.mr2.truncate", {
		title: label,
		class: dspLblCls()
	}, label) : null;
}

export function getLabel({ id, label, required }: TField) {
	return label ? m("label.mb1.db", {
		title: label,
		for: id,
		class: lblCls()
	}, getLabelText(label, required)) : null;
}

// Common to interactive widgets
export function getEnabledClass(disabled?: boolean, readonly?: boolean) {
	return disabled ? "o-60" : readonly ? "" : "pointer";
}

// Input widget TProp update helpers
export function setValue(val: stream<TProp>) {
	return ({ target: { value } }: { target: HTMLInputElement }) => val(value);
}

export function setCheck(chk: stream<TProp>) {
	return ({ target: { checked } }: { target: HTMLInputElement }) => chk(checked);
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
 * Scale given width and height values if either exceed the giving limit
 * Returns integer values, rounding errors can significantly distort small rectangles
 */
export function scaleRect(width: number, height: number, limit: number): [number, number] {
	if (width > height) {
		if (width > limit) {
			return [limit, Math.round(height * limit / width)];
		}
	} else if (height > limit) {
		return [Math.round(width * limit / height), limit];
	}
	return [width, height];
}

export function getOrientation(buffer: ArrayBuffer) {
	// Image exif data in first 64k of file
	const viewLen = Math.min(buffer.byteLength, 64 * 1024);
	const view = new DataView(buffer, 0, viewLen);
	if (view.getUint16(0, false) !== 0xFFD8) {
		return -2;
	}
	const length = view.byteLength;
	let offset = 2;
	while (offset < length) {
		const marker = view.getUint16(offset, false);
		offset += 2;

		if (marker === 0xFFE1) {
			if (view.getUint32(offset += 2, false) !== 0x45786966) {
				return -1;
			}
			const little = view.getUint16(offset += 6, false) === 0x4949;
			offset += view.getUint32(offset + 4, little);
			const tags = view.getUint16(offset, little);
			offset += 2;

			for (let i = 0; i < tags; i++) {
				if (view.getUint16(offset + (i * 12), little) === 0x0112) {
					return view.getUint16(offset + (i * 12) + 8, little);
				}
			}
		} else if ((marker & 0xFF00) !== 0xFF00) {
			break;
		} else {
			offset += view.getUint16(offset, false);
		}
	}
	return -1;
}

export function readOrientation(file: File): Promise<number> {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve(getOrientation(reader.result as ArrayBuffer));
		};
		reader.readAsArrayBuffer(file);
	});
}

export function rotateContext(ctx: CanvasRenderingContext2D, width: number, height: number, orientation?: number) {
	if (!orientation || orientation > 8) {
		return;
	}
	switch (orientation) {
		case 2:
			// Horizontal flip
			ctx.translate(width, 0);
			ctx.scale(-1, 1);
			return;
		case 3:
			// 180 rotate anticlockwise
			ctx.translate(width, height);
			ctx.rotate(Math.PI);
			return;
		case 4:
			// Vertical flip
			ctx.translate(0, height);
			ctx.scale(1, -1);
			return;
		case 5:
			// Vertical flip + 90 rotate clockwise
			ctx.rotate(0.5 * Math.PI);
			ctx.scale(1, -1);
			return;
		case 6:
			// 90 rotate clockwise
			ctx.rotate(0.5 * Math.PI);
			ctx.translate(0, -height);
			return;
		case 7:
			// Horizontal flip + 90 rotate clockwise
			ctx.rotate(0.5 * Math.PI);
			ctx.translate(width, -height);
			ctx.scale(-1, 1);
			return;
		case 8:
			// 90 rotate anticlockwise
			ctx.rotate(-0.5 * Math.PI);
			ctx.translate(-width, 0);
			return;
	}
}

/**
 * Shrink an image if width/height exceeds a given maximum
 * @param file Image file to resize
 * @param maxSize Maximum dimension size in pixels
 * @param type Image MIME type to return
 */
export function resizeImage(file: File, maxSize: number, type?: string): Promise<string> {
	if (!file.type.match(/image.*/)) {
		return Promise.reject(new Error("File most be an image"));
	}
	return readOrientation(file)
		.then((orientation) => new Promise((resolve) => {
			const image = new Image();
			image.onload = () => {
				const canvas = document.createElement("canvas");
				const [width, height] = scaleRect(image.width, image.height, maxSize);
				// Orientations after 4 are rotated 90 degrees
				if (orientation > 4) {
					canvas.width = height;
					canvas.height = width;
				} else {
					canvas.width = width;
					canvas.height = height;
				}
				const context = canvas.getContext("2d") as CanvasRenderingContext2D;
				rotateContext(context, width, height, orientation);
				context.drawImage(image, 0, 0, width, height);
				resolve(canvas.toDataURL(type));
			};
			const reader = new FileReader();
			reader.onload = () => image.src = reader.result as string;
			reader.readAsDataURL(file);
		}));
}

// Create dataURL image from given text
export function textToImage(text: string, width: number, height: number, font: string): string {
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const fontSize = 0.56 * canvas.height;
	const context = canvas.getContext("2d") as CanvasRenderingContext2D;
	context.textBaseline = "middle";
	context.font = `${fontSize}px ${font}`;
	context.fillText(text, canvas.height * 0.05, fontSize);
	return canvas.toDataURL();
}
