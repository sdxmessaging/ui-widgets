import "./mockBrowser";
// tslint:disable-next-line no-var-requires
const o = require("ospec");

import stream, { Stream } from "mithril/stream";
import { TProp } from "./interface/widget";

import {
	applyTheme,
	// dataURItoBlob,
	fileNameExtSplit,
	getIcon,
	getOrientation,
	guid,
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
		const value: Stream<TProp> = stream<TProp>("Initial");
		const mod = setValue(value);
		const input = window.document.createElement("input");
		input.value = "Update";
		mod({ target: input });
		o(value()).equals(input.value);
	});

	o("Update check", () => {
		const check: Stream<TProp> = stream<TProp>(true);
		const mod = setCheck(check);
		const input = window.document.createElement("input");
		input.checked = false;
		mod({ target: input });
		o(check()).equals(input.checked);
	});

});

o.spec("Scale rectangle", () => {

	o("width exceed", () => {
		const [scaleWidth, scaleHeight] = scaleRect(12, 6, 8);
		o(scaleWidth).equals(8);
		o(scaleHeight).equals(4);
	});

	o("width within", () => {
		const [scaleWidth, scaleHeight] = scaleRect(12, 6, 12);
		o(scaleWidth).equals(12);
		o(scaleHeight).equals(6);
	});

	o("height exceed", () => {
		const [scaleWidth, scaleHeight] = scaleRect(6, 12, 8);
		o(scaleWidth).equals(4);
		o(scaleHeight).equals(8);
	});

	o("height within", () => {
		const [scaleWidth, scaleHeight] = scaleRect(6, 12, 12);
		o(scaleWidth).equals(6);
		o(scaleHeight).equals(12);
	});

});

o.spec("Blob", () => {

	// TODO Mock atob and Blob

	o("create", () => {
		// tslint:disable-next-line:max-line-length
		// const blob: Blob = dataURItoBlob("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAABAAEDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6AP/9k=");
		// o(blob.type).equals("image/jpeg");
	});

});

// resizeImage

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
