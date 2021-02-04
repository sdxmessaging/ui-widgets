import lodash from "lodash";
import stream from "mithril/stream";

import {
	dataURItoBlob,
	fileNameExtSplit,
	fileConstructor,
	getOrientation,
	guid,
	resizeImage,
	rotateContext,
	scaleRect,
	setCheck,
	setValue,
	getFileTypeIcon
} from "./utils";

describe("Utils", () => {

	test("Create unique ID", () => {
		expect(guid().length).toBe(36);
	});

	test("File name handling", () => {
		expect(fileNameExtSplit("test.complex.extension")).toMatchObject(["test.complex", ".extension"]);
		expect(fileNameExtSplit("test no ext")).toMatchObject(["test no ext", ""]);
	});

});

describe("Input value update", () => {

	test("Update value", () => {
		const value = stream<string>("Initial");
		const mod = setValue(value);
		const input = window.document.createElement("input");
		input.value = "Update";
		mod({ target: input });
		expect(value()).toBe(input.value);
	});

	test("Update check", () => {
		const check = stream<boolean>(true);
		const mod = setCheck(check);
		const input = window.document.createElement("input");
		input.checked = false;
		mod({ target: input });
		expect(check()).toBe(input.checked);
	});

});

describe("Scale rectangle", () => {

	test("width exceed", () => {
		expect(scaleRect(12, 6, 8)).toMatchObject([8, 4]);
	});

	test("width within", () => {
		expect(scaleRect(12, 6, 12)).toMatchObject([12, 6]);
	});

	test("height exceed", () => {
		expect(scaleRect(6, 12, 8)).toMatchObject([4, 8]);
	});

	test("height within", () => {
		expect(scaleRect(6, 12, 12)).toMatchObject([6, 12]);
	});

});

describe("File", () => {

	test("create", () => {
		const blob = dataURItoBlob("data:text/plain;charset=UTF-8;page=21,hello%20world");
		expect(blob.type).toBe("text/plain");
		const file = fileConstructor(blob, "testFile.txt");
		expect(file.name).toBe("testFile.txt");
		expect(file.type).toBe("text/plain");
	});

	test("resize", (done) => {
		const file = new File([
			dataURItoBlob("data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")
		], "test.gif", { type: "image/gif" });
		resizeImage(file, 100, "image/png")
			.then((dataUrl) => {
				expect(dataUrl.length > 0).toBe(true);
				done();
			});
	});

	test("resize error", (done) => {
		const file = new File(["test"], "test.txt");
		resizeImage(file, 100)
			.catch((err: Error) => {
				expect(err.message).toBe("File must be an image");
				done();
			});
	});

});

describe("Image orientation", () => {

	test("no jpeg marker", () => {
		const buffer = new ArrayBuffer(8);
		const orientation = getOrientation(buffer);
		expect(orientation).toBe(-2);
	});

	test("no exif", () => {
		const buffer = new ArrayBuffer(8);
		const view = new DataView(buffer, 0, buffer.byteLength);
		// Mark first byte
		view.setUint16(0, 0xFFD8, false);
		const orientation = getOrientation(buffer);
		expect(orientation).toBe(-1);
	});

	// TODO Work out what the other bytes mean
	test("no orientation", () => {
		const buffer = new ArrayBuffer(128);
		const view = new DataView(buffer);
		// Mark first byte
		view.setUint16(0, 0xFFD8, false);
		view.setUint16(2, 0xFFE1, false);
		view.setUint32(6, 0x00000000, false);
		const orientation = getOrientation(buffer);
		expect(orientation).toBe(-1);
	});

	test("orientation", () => {
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
		expect(orientation).toBe(4);
	});

});

describe("Canvas rotation", () => {

	const mockContext = ({
		translate: () => null,
		rotate: () => null,
		scale: () => null
	} as unknown) as CanvasRenderingContext2D;

	test("cases", () => {
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

describe("File icon", () => {

	test("common extensions", () => {
		lodash.each([
			".doc", ".docx", ".dot", ".wbk", ".docm", ".dotx", ".dotm", ".docb",
			".txt", ".webm", ".mkv", ".flv", ".vob", ".ogv", ".drc", ".gifv",
			".mng", ".avi", ".mts", ".m2ts", ".mov", ".qt", ".wmv", ".yuv",
			".rm", ".rmvb", ".viv", ".asf", ".amv", ".mp4", ".m4p", ".m4v",
			".mpg", ".mp2", ".mpeg", ".mpe", ".mpv", ".m2v", ".svi", ".3gp",
			".mxf", ".roq", ".nsv", ".f4v", ".f4p", ".f4a", ".f4b", ".pdf",
			".pcm", ".wav", ".aiff", ".mp3", ".aac", ".ogg", ".wma", ".flac",
			".alac", ".xls", ".xlt", ".xlm", ".xlsx", ".xlsm", ".xltx", ".xltm",
			".xlsb", ".xla", ".xlam", ".xll", ".xlw", ".html", ".js", ".css",
			".scss", ".java", ".jpg", ".jpeg", ".png", ".tiff", ".gif", ".svg",
			".webp"
		], (ext) => {
			expect(getFileTypeIcon({
				guid: "test",
				name: "test" + ext,
				path: "test"
			}).length > 0).toBe(true);
		});
	});

});
