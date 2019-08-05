// tslint:disable no-var-requires
const o = require("ospec");

import stream from "mithril/stream";
import { TProp } from "./interface/widget";

import {
	applyTheme,
	dataURItoBlob,
	fileNameExtSplit,
	getIcon,
	getOrientation,
	guid,
	resizeImage,
	rotateContext,
	scaleRect,
	setCheck,
	setValue
} from "./utils";

o.spec("Utility functions", () => {

	o("Default icon style", () => {
		o(getIcon("fa-test")).equals("fas fa-test");
	});

	o("Change icon style", () => {
		applyTheme({
			icon: "fal"
		});
		o(getIcon("fa-test")).equals("fal fa-test");
	});

	o("Create unique ID", () => {
		o(guid().length).equals(36);
	});

	o("File name handling", () => {
		o(fileNameExtSplit("test.complex.extension")).deepEquals(["test.complex", ".extension"]);
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
		const blob = dataURItoBlob("data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
		o(blob.type).equals("image/gif");
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
