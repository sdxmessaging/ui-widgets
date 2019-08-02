// tslint:disable no-var-requires
const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile, IMithrilEvent } from "../interface/widget";

import { FileInput } from "./fileInput";
import { change, dragStart, dragStop, drop } from "./fileInput";

o.spec("FileInput", () => {

	o("disabled", () => {
		const root = window.document.createElement("div");
		const dragging = stream<boolean>(false);
		m.mount(root, {
			view: () => m(FileInput, {
				field: {
					id: "test",
					label: "test",
					name: "Test",
					disabled: true,
					type: FieldType.file
				},
				dragging,
				onSet: (_) => null
			})
		});
		o(root.childNodes.length).equals(1);
		const label = root.childNodes[0] as HTMLLabelElement;
		// Label has input, text nodes only
		o(label.childNodes.length).equals(2);
		o((label.childNodes[0] as HTMLInputElement).hasAttribute("disabled")).equals(true);

	});

	o("drag/drop", () => {
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
		o(dragState()).equals(true);
		// Repeat drag
		start(dummyEvt);
		o(dragState()).equals(true);
		// End drag
		const stop = dragStop(dragState);
		stop(dummyEvt);
		o(dragState()).equals(false);
		// Drop file
		const set = drop(dragState, (setList) => {
			// No files on event dataTransfer
			o(setList).equals(undefined);
		});
		set(dummyEvt);
		o(dragState()).equals(false);
		o(fileList().length).equals(0);
	});

	o("change", () => {
		const fileList = stream<IFile[]>([]);
		// Mock callback
		const spy = o.spy((_: FileList) => null);
		const set = change(spy);
		// Mock input with FileList
		const file = { name: "Test" };
		const addList = [file];
		set({
			target: {
				files: (addList as unknown) as FileList
			} as HTMLInputElement
		});
		// Validate callback
		o(spy.callCount).equals(1);
		o(spy.args[0]).deepEquals(addList);
		o(fileList().length).equals(0);
	});

});
