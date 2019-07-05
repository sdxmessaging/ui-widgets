// Not part of dist bundle

// Globals
declare const m: any;
// import * as widgets from "./index";
const widgets = (window as any).uiWidgets;

document.addEventListener("DOMContentLoaded", () => {

	const textVal = m.stream("Change Me");
	const dateVal = m.stream();
	const colVal = m.stream();
	const checkVal = m.stream();
	const optVal = m.stream();

	const imgList = m.stream([]);

	m.mount(document.getElementById("page") as HTMLElement, {
		view: () => m(".pa3", [

			m("h3", "Example"),
			m("p", "These example input/display pairs manipulate a common stream"),

			m("h3", "Basic Inputs"),

			// Text
			m(".mw8.flex.mb2", [
				m(".w-50.pa2.mr2.ba.b--silver", m(widgets.BaseInput, {
					field: {
						id: "text-in",
						label: "Text Input",
						type: "text"
					},
					value: textVal
				})),
				m(".w-50.pa2.ba.b--silver", m(widgets.BaseText, {
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
				m(".w-50.pa2.mr2.ba.b--silver", m(widgets.BaseInput, {
					field: {
						id: "date-in",
						label: "Date Input",
						type: "date"
					},
					value: dateVal
				})),
				m(".w-50.pa2.ba.b--silver", m(widgets.BaseText, {
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
				m(".w-50.pa2.mr2.ba.b--silver", m(widgets.BaseInput, {
					field: {
						id: "color-in",
						label: "Colour Input",
						type: "color"
					},
					value: colVal
				})),
				m(".w-50.pa2.ba.b--silver", m(widgets.BaseText, {
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
				m(".w-50.pa2.mr2.ba.b--silver", m(widgets.CheckboxInput, {
					field: {
						id: "check-in",
						label: "Checkbox Input",
						type: "checkbox"
					},
					value: checkVal
				})),
				m(".w-50.pa2.ba.b--silver", m(widgets.Checkbox, {
					field: {
						id: "check-out",
						label: "Checkbox Output",
						type: "text"
					},
					value: checkVal
				}))
			]),

			// Select/Radio
			m(".mw8.flex.mb2", [
				m(".w-50.pa2.mr2.ba.b--silver", m(widgets.SelectInput, {
					field: {
						id: "select-in",
						label: "Colour Input",
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
				m(".w-50.pa2.ba.b--silver", m(widgets.RadioInput, {
					field: {
						id: "radio-in",
						label: "Colour Output",
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
				m(".w-50.pa2.mr2.ba.b--silver", m(widgets.ImageMulti, {
					field: {
						id: "image-in",
						label: "Image Input",
						type: "color"
					},
					value: imgList
				})),
				m(".w-50.pa2.ba.b--silver", m(widgets.FileDownload, {
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
