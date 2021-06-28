
import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile, IMithrilEvent } from "../interface/widget";

import { FileInput } from "./fileInput";
import { change, dragStart, dragStop, drop } from "./fileInput";

describe("FileInput", () => {

	test("basic + no label + title", () => {
		const root = window.document.createElement("div");
		const dragging = stream<boolean>(false);
		m.mount(root, {
			view: () => m(FileInput, {
				field: {
					id: "test",
					label: "",
					type: FieldType.file,
					title: "test title"
				},
				dragging,
				onSet: () => null
			})
		});
		expect(root.childNodes.length).toBe(1);
	});

	test("disabled + name + uiClass + accept", () => {
		const root = window.document.createElement("div");
		const dragging = stream<boolean>(false);
		m.mount(root, {
			view: () => m(FileInput, {
				field: {
					id: "test",
					label: "test",
					name: "Test",
					disabled: true,
					type: FieldType.file,
					uiClass: {},
					accept: ".pdf"
				},
				dragging,
				onSet: () => null
			})
		});
		expect(root.childNodes.length).toBe(1);
		const label = root.childNodes[0] as HTMLLabelElement;
		// Label has clipped input, "label" span, and any passed child nodes
		expect(label.childNodes.length).toBe(2);
		expect((label.childNodes[0] as HTMLInputElement).hasAttribute("disabled")).toBe(true);
	});

	test("drag/drop", () => {
		const dragState = stream<boolean>(false);
		const fileList = stream<IFile[]>([]);
		// Mock drag event with no dataTransfer.files
		const dummyEvt = ({
			preventDefault: () => null,
			dataTransfer: {
				dropEffect: ""
			}
		} as unknown) as DragEvent & IMithrilEvent;
		// Start drag
		const start = dragStart(dragState);
		start(dummyEvt);
		expect(dragState()).toBe(true);
		// Repeat drag
		start(dummyEvt);
		expect(dragState()).toBe(true);
		// End drag
		const stop = dragStop(dragState);
		stop(dummyEvt);
		expect(dragState()).toBe(false);
		// Drop file
		const set = drop(dragState, (setList) => {
			// No files on event dataTransfer
			expect(setList).toBeUndefined();
		});
		set(dummyEvt);
		expect(dragState()).toBe(false);
		expect(fileList().length).toBe(0);
	});

	test("drag/drop", () => {
		const dragState = stream<boolean>(false);
		const fileList = stream<IFile[]>([]);
		// Mock drag event with no dataTransfer.files
		const dummyEvt = ({
			preventDefault: () => null
		} as unknown) as DragEvent & IMithrilEvent;
		// Start drag
		const start = dragStart(dragState);
		start(dummyEvt);
		expect(dragState()).toBe(true);
		// Drop file
		const set = drop(dragState, (setList) => {
			// No event dataTransfer
			expect(setList).toBeUndefined();
		});
		set(dummyEvt);
		expect(dragState()).toBe(false);
		expect(fileList().length).toBe(0);
	});

	test("change", () => {
		const fileList = stream<IFile[]>([]);
		// Mock callback
		const mockCallback = jest.fn((value) => value);
		const set = change(mockCallback);
		// Mock input with FileList
		const file = { name: "Test" };
		const addList = [file];
		set({
			target: {
				files: (addList as unknown) as FileList
			} as HTMLInputElement
		});
		// Validate callback
		expect(mockCallback.mock.calls.length).toBe(1);
		expect(mockCallback.mock.results[0].value).toMatchObject(addList);
		expect(fileList().length).toBe(0);
	});

});
