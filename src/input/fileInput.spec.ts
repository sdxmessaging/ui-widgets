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
		const set = drop(dragState, fileList);
		set(dummyEvt);
		o(dragState()).equals(false);
		o(fileList.length).equals(0);
	});

	o("change", () => {
		const fileList = stream<IFile[]>([]);
		const set = change(fileList);
		// TODO Simulate adding a file object
		// create array of "file-like" case to FileList
		const input = window.document.createElement("input");
		set({ target: input });
		o(fileList.length).equals(0);
	});

});
