import lodash from "lodash";
import m, { Children } from "mithril";

import { IModelField } from "./interface/widget";

export const inputBorder: string = "border-box bn";
export const inputText: string = "fw2 dark-gray";
export const labelCls: string = "mb1 f6 silver";

export const pxRatio: number = Math.max(window.devicePixelRatio || 1, 1);

// Used by display widgets
// TODO Consolidate with getLabel
export function getDisplayLabel({ label }: IModelField, className?: string) {
	return m("span.mr2.silver.truncate", {
		title: label,
		class: className
	}, label);
}

export function getLabel({ id, label, required }: IModelField): Children {
	return m("label", {
		title: label,
		for: id,
		class: labelCls
	}, getLabelText(label, required));
}

export function getLabelText(label: string, required?: boolean): string {
	return required ? `${label}*` : label;
}

export function imgSrc(path: string, dataUrl?: string): string {
	return dataUrl ? dataUrl : path;
}

export function guid(): string {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		// tslint:disable-next-line
		const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

export function pickByProperty<T>(list: ReadonlyArray<T>, prop: Partial<T>): T | undefined {
	return lodash.find(list, lodash.matches(prop));
}

/**
 * Mutates input list, returns array of removed items
 */
export function removeByProperty<T>(list: T[], prop: Partial<T>): T[] {
	return lodash.remove(list, lodash.matches(prop));
}

/**
 * Split given file name from extension
 */
export function fileNameExtSplit(fileName: string): [string, string] {
	const extIdx = fileName.lastIndexOf(".");
	return [fileName.substr(0, extIdx), fileName.substr(extIdx)];
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

export function resizeImage(file: File, maxSize: number, type: string): Promise<string> {
	return new Promise((resolve, reject) => {
		if (!file.type.match(/image.*/)) {
			reject(new Error("File most be an image"));
			return;
		}
		const reader = new FileReader();
		reader.onload = (evt: ProgressEvent) => {
			if (!(evt && evt.target)) {
				return;
			}
			const { result } = evt.target as FileReader;

			const image = new Image();
			image.onload = () => {
				const canvas = document.createElement("canvas");
				const [width, height] = scaleRect(image.width, image.height, maxSize);
				const orientation = getOrientation(result as ArrayBuffer);
				// Orientations after 4 are rotated 90 degrees
				if (orientation > 4) {
					canvas.width = height;
					canvas.height = width;
				} else {
					canvas.width = width;
					canvas.height = height;
				}
				const context = canvas.getContext("2d");
				if (context) {
					rotateContext(context, width, height, orientation);
					context.drawImage(image, 0, 0, width, height);
				}
				resolve(canvas.toDataURL(type));
			};
			const imageBlob = new Blob([result as ArrayBuffer]);
			image.src = window.URL.createObjectURL(imageBlob);
		};
		reader.readAsArrayBuffer(file);
	});
}

function getOrientation(buffer: ArrayBuffer) {
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
			// tslint:disable-next-line:no-bitwise
		} else if ((marker & 0xFF00) !== 0xFF00) {
			break;
		} else {
			offset += view.getUint16(offset, false);
		}
	}
	return -1;
}

function rotateContext(ctx: CanvasRenderingContext2D, width: number, height: number, orientation?: number) {
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
