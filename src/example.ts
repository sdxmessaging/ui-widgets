// Not part of dist bundle

import m from "mithril";
import stream from "mithril/stream";
import { BaseText, Checkbox } from "./index";
import { BaseInput, CheckboxInput, RadioInput, SelectInput } from "./index";
import { FileList, ImageMulti } from "./index";

import { IFile, TProp } from "./interface/widget";

document.addEventListener("DOMContentLoaded", () => {

	// Simple props
	const textVal = stream<TProp>("Change Me");
	const dateVal = stream<TProp>();
	const colVal = stream<TProp>();
	const checkVal = stream<TProp>();
	const optVal = stream<TProp>();

	// Files
	const imgList = stream<IFile[]>([]);

	m.mount(document.getElementById("page") as HTMLElement, {
		view: () => m(".pa3", [

			m("h3", "Example"),
			m("p", "These example input/display pairs manipulate a common stream"),

			m("h3", "Basic Inputs"),
			m("p", "Display components reflect changes to input components"),

			// Text
			m(".mw8.flex.mb2", [
				m(".w-50.pa2.mr2.ba.b--silver", m(BaseInput, {
					field: {
						id: "text-in",
						label: "Text Input",
						type: "text"
					},
					value: textVal
				})),
				m(".w-50.pa2.ba.b--silver", m(BaseText, {
					field: {
						id: "text-out",
						label: "Text Output",
						type: "text"
					},
					value: textVal
				}))
			]),

			// Date
			m(".mw8.flex.mb2", [
				m(".w-50.pa2.mr2.ba.b--silver", m(BaseInput, {
					field: {
						id: "date-in",
						label: "Date Input",
						type: "date"
					},
					value: dateVal
				})),
				m(".w-50.pa2.ba.b--silver", m(BaseText, {
					field: {
						id: "date-out",
						label: "Date Output",
						type: "text"
					},
					value: dateVal
				}))
			]),

			// Colour
			m(".mw8.flex.mb2", [
				m(".w-50.pa2.mr2.ba.b--silver", m(BaseInput, {
					field: {
						id: "color-in",
						label: "Colour Input",
						type: "color"
					},
					value: colVal
				})),
				m(".w-50.pa2.ba.b--silver", m(BaseText, {
					field: {
						id: "color-out",
						label: "Colour Output",
						type: "text"
					},
					value: colVal
				}))
			]),

			// Checkbox
			m(".mw8.flex.mb2", [
				m(".w-50.pa2.mr2.ba.b--silver", m(CheckboxInput, {
					field: {
						id: "check-in",
						label: "Checkbox Input",
						type: "checkbox"
					},
					value: checkVal
				})),
				m(".w-50.pa2.ba.b--silver", m(Checkbox, {
					field: {
						id: "check-out",
						label: "Checkbox Output",
						type: "text"
					},
					value: checkVal
				}))
			]),

			m("h3", "Multiple Inputs"),
			m("p", "Multiple inputs can share the same value"),

			// Select/Radio
			m(".mw8.flex.mb2", [
				m(".w-50.pa2.mr2.ba.b--silver", m(SelectInput, {
					field: {
						id: "select-in",
						label: "Select Input",
						type: "select",
						options: [{
							label: "Opt 1",
							value: "1"
						}, {
							label: "Opt 2",
							value: "2"
						}]
					},
					value: optVal
				})),
				m(".w-50.pa2.ba.b--silver", m(RadioInput, {
					field: {
						id: "radio-in",
						label: "Radio Input",
						type: "radio",
						options: [{
							label: "Opt 1",
							value: "1"
						}, {
							label: "Opt 2",
							value: "2"
						}]
					},
					value: optVal
				}))
			]),

			m("h3", "Files"),
			m("p", "These file widgets operate on a single file array stream, printed in the box below"),

			// Image/FileList
			m(".mw8.flex.mb2", [
				m(".w-50.pa2.mr2.ba.b--silver", m(ImageMulti, {
					field: {
						id: "image-in",
						label: "Image Input",
						type: "color"
					},
					value: imgList
				})),
				m(".w-50.pa2.ba.b--silver", m(FileList, {
					field: {
						id: "image-out",
						label: "File List Output",
						type: "text"
					},
					value: imgList
				})),
			]),

			// Pretty-print
			m(".mw8.h5.mb2.bg-dark-blue.f5.moon-gray.pre",
				m("p.pa2.code", JSON.stringify(imgList(), null, 2))
			)
		])
	});

});
