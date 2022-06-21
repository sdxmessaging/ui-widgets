import { dataURItoBlob } from "./utils";
import {
	img,
	getOrientation,
	resizeImage,
	rotateContext,
	scaleRect
} from "./imageUtils";

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

	test("unknown image format", () => {
		const buffer = new ArrayBuffer(8);
		const view = new DataView(buffer, 0, buffer.byteLength);
		// Mark first byte with JPEG header
		view.setUint16(0, img.jpeg, false);
		view.setUint16(2, img.unknown, false);
		const orientation = getOrientation(buffer);
		expect(orientation).toBe(-1);
	});

	test("no APP1", () => {
		const buffer = new ArrayBuffer(8);
		const view = new DataView(buffer, 0, buffer.byteLength);
		// Mark first byte with JPEG header
		view.setUint16(0, img.jpeg, false);
		const orientation = getOrientation(buffer);
		expect(orientation).toBe(-1);
	});

	test("no exit in APP1 section", () => {
		const buffer = new ArrayBuffer(128);
		const view = new DataView(buffer);
		view.setUint16(0, img.jpeg, false);
		// Mark APP1 section
		view.setUint16(2, img.app1, false);
		view.setUint32(6, 0x00000000, false);
		const orientation = getOrientation(buffer);
		expect(orientation).toBe(-1);
	});

	test("orientation", () => {
		const buffer = new ArrayBuffer(128);
		const view = new DataView(buffer);
		view.setUint16(0, img.jpeg, false);
		view.setUint16(2, img.app1, false);
		// Mark exif data
		view.setUint32(6, img.exif, false);
		// Big endian
		view.setUint16(12, 0x0000, false);
		// Offset
		view.setUint32(16, 0x00000014);
		// Tags
		view.setUint16(32, 0x0001);
		// Orientation key/value
		view.setUint16(34, img.orientation, false);
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
