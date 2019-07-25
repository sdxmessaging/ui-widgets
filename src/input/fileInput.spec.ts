import "../mockBrowser";
// tslint:disable no-var-requires
const o = require("ospec");

import stream from "mithril/stream";

import { IFile } from "../interface/widget";

import { change, dragStart, dragStop, drop } from "./fileInput";

o.spec("FileInput", () => {

	o("drag/drop", () => {
		const dragState = stream<boolean>(false);
		const fileList = stream<IFile[]>([]);
		// Mock drag event with no dataTransfer.files
		const dummyEvt = ({
			preventDefault: () => null,
			dataTransfer: {
				dropEffect: ""
			}
		} as unknown) as DragEvent;
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
		const input = window.document.createElement("input");
		input.files = (addList as unknown) as FileList;
		set({ target: input });
		// Validate callback
		o(spy.callCount).equals(1);
		o(spy.args[0]).deepEquals(addList);
		o(fileList().length).equals(0);
	});

});
