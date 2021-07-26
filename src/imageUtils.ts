import { config } from "./config";

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
			offset += 2;
			if (view.getUint32(offset, false) !== 0x45786966) {
				return -1;
			}
			offset += 6;
			const little = view.getUint16(offset, false) === 0x4949;
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

export function readArrayBuffer(file: File): Promise<ArrayBuffer> {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result as ArrayBuffer);
		};
		reader.readAsArrayBuffer(file);
	});
}

export function readOrientation(file: File): Promise<number> {
	return readArrayBuffer(file).then(getOrientation);
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

/**
 * Shrink an image if width/height exceeds a given maximum
 * @param file Image file to resize
 * @param maxSize Maximum dimension size in pixels
 * @param type Image MIME type to return
 */
export function resizeImage(file: File, maxSize: number, type?: string): Promise<string> {
	if (!file.type.match(/image.*/)) {
		return Promise.reject(new Error("File must be an image"));
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

export function scaleDataUrl(dataUrl: string, maxSize: number): Promise<string> {
	return new Promise((resolve) => {
		const image = new Image();
		image.onload = () => {
			const canvas = document.createElement("canvas");
			const [width, height] = scaleRect(image.width, image.height, maxSize);
			canvas.width = width;
			canvas.height = height;
			const context = canvas.getContext("2d") as CanvasRenderingContext2D;
			context.drawImage(image, 0, 0, width, height);
			resolve(canvas.toDataURL());
		};
		image.src = dataUrl;
	});
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

export function createStamp(sign: string, heightPct: number): string {
	const width = config.signMaxSize;
	// Signatures assumed wider than their height
	const height = 0.01 * heightPct * width;
	return textToImage(sign, width, height, config.signFont);
}
