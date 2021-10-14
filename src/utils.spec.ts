import lodash from "lodash";
import stream from "mithril/stream";

import {
	guid,
	fileNameExtSplit,
	setCheck, setValue,
	dataURItoBlob, fileConstructor,
	getFileTypeIcon,
	getLabel
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

describe("File", () => {

	test("create", () => {
		const blob = dataURItoBlob("data:text/plain;charset=UTF-8;page=21,hello%20world");
		expect(blob.type).toBe("text/plain");
		const file = fileConstructor(blob, "testFile.txt");
		expect(file.name).toBe("testFile.txt");
		expect(file.type).toBe("text/plain");
	});

});

describe("getLabel", () => {
	test("getLabel return null", () => {
		const label = getLabel('testId', {});
		expect(label).toBeNull();
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
