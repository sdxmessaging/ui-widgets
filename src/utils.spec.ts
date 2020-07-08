const o = require("ospec");

import stream from "mithril/stream";
import { TProp } from "./interface/widget";

import {
	dataURItoBlob,
	fileNameExtSplit,
	getOrientation,
	guid,
	resizeImage,
	rotateContext,
	scaleRect,
	setCheck,
	setValue
} from "./utils";

o.spec("Utils", () => {

	o("Create unique ID", () => {
		o(guid().length).equals(36);
	});

	o("File name handling", () => {
		o(fileNameExtSplit("test.complex.extension")).deepEquals(["test.complex", ".extension"]);
		o(fileNameExtSplit("test no ext")).deepEquals(["test no ext", ""]);
	});

});

o.spec("Input TProp update", () => {

	o("Update value", () => {
		const value: stream<TProp> = stream<TProp>("Initial");
		const mod = setValue(value);
		const input = window.document.createElement("input");
		input.value = "Update";
		mod({ target: input });
		o(value()).equals(input.value);
	});

	o("Update check", () => {
		const check: stream<TProp> = stream<TProp>(true);
		const mod = setCheck(check);
		const input = window.document.createElement("input");
		input.checked = false;
		mod({ target: input });
		o(check()).equals(input.checked);
	});

});

o.spec("Scale rectangle", () => {

	o("width exceed", () => {
		o(scaleRect(12, 6, 8)).deepEquals([8, 4]);
	});

	o("width within", () => {
		o(scaleRect(12, 6, 12)).deepEquals([12, 6]);
	});

	o("height exceed", () => {
		o(scaleRect(6, 12, 8)).deepEquals([4, 8]);
	});

	o("height within", () => {
		o(scaleRect(6, 12, 12)).deepEquals([6, 12]);
	});

});

o.spec("File", () => {

	o("create", () => {
		const blob = dataURItoBlob("data:text/plain;charset=UTF-8;page=21,hello%20world");
		o(blob.type).equals("text/plain");
	});

	o("resize", (done: () => void) => {
		const file = new File([
			dataURItoBlob("data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")
		], "test.gif", { type: "image/gif" });
		resizeImage(file, 100, "image/png")
			.then((dataUrl) => {
				o(dataUrl.length > 0).equals(true);
				done();
			});
	});

	o("resize error", (done: () => void) => {
		const file = new File(["test"], "test.txt");
		resizeImage(file, 100)
			.catch((err: Error) => {
				o(err.message).equals("File must be an image");
				done();
			});
	});

});

o.spec("Image orientation", () => {

	o("no jpeg marker", () => {
		const buffer = new ArrayBuffer(8);
		const orientation = getOrientation(buffer);
		o(orientation).equals(-2);
	});

	o("no exif", () => {
		const buffer = new ArrayBuffer(8);
		const view = new DataView(buffer, 0, buffer.byteLength);
		// Mark first byte
		view.setUint16(0, 0xFFD8, false);
		const orientation = getOrientation(buffer);
		o(orientation).equals(-1);
	});

	// TODO Work out what the other bytes mean
	o("no orientation", () => {
		const buffer = new ArrayBuffer(128);
		const view = new DataView(buffer);
		// Mark first byte
		view.setUint16(0, 0xFFD8, false);
		view.setUint16(2, 0xFFE1, false);
		view.setUint32(6, 0x00000000, false);
		const orientation = getOrientation(buffer);
		o(orientation).equals(-1);
	});

	o("orientation", () => {
		const buffer = new ArrayBuffer(128);
		const view = new DataView(buffer);
		// Mark first bytes
		view.setUint16(0, 0xFFD8, false);
		view.setUint16(2, 0xFFE1, false);
		// "Magic" number
		view.setUint32(6, 0x45786966, false);
		// Big endian
		view.setUint16(12, 0x0000, false);
		// Offset
		view.setUint32(16, 0x00000014);
		// Tags
		view.setUint16(32, 0x0001);
		// Orientation key/value
		view.setUint16(34, 0x0112, false);
		view.setUint16(42, 0x0004, false);
		const orientation = getOrientation(buffer);
		o(orientation).equals(4);
	});

});

o.spec("Canvas rotation", () => {

	const mockContext = ({
		translate: () => null,
		rotate: () => null,
		scale: () => null
	} as unknown) as CanvasRenderingContext2D;

	o("cases", () => {
		// No action
		rotateContext(mockContext, 1, 1, -1);
		rotateContext(mockContext, 1, 1, 9);
		// Rotations and flips
		rotateContext(mockContext, 1, 1, 2);
		rotateContext(mockContext, 1, 1, 3);
		rotateContext(mockContext, 1, 1, 4);
		rotateContext(mockContext, 1, 1, 5);
		rotateContext(mockContext, 1, 1, 6);
		rotateContext(mockContext, 1, 1, 7);
		rotateContext(mockContext, 1, 1, 8);
	});

});
