'use strict';

document.addEventListener("DOMContentLoaded", function () {
	var stream = m.stream;

	// Simple props
	var textVal = stream("Text");
	var dateVal = stream();
	var colVal = stream("#cc0011");
	var checkVal = stream();
	var optVal = stream();
	// Files
	var fileList = stream([]);
	var imgList = stream([]);
	var signList = stream([]);

	m.mount(document.getElementById("page"), {
		view: function () {
			return m(".pa3.mb5", [
				m("h3", "Example"),
				m("p", "These example input/display widgets manipulate a common stream"),

				m("h3", "Basic Inputs"),
				m("p", "Display components reflect changes to input components"),

				// Text
				m(".mw8.flex.mb2.items-center", [
					m(".flex.flex-column.w-50.mr2", [
						m(".pa2.mb2.ba.b--silver", m(uiWidgets.BaseInput, {
							field: {
								id: "text-in-input",
								label: "Text Input (updates on input)",
								type: "text",
								instant: true
							},
							value: textVal
						})),
						m(".pa2.ba.b--silver", m(uiWidgets.BaseInput, {
							field: {
								id: "text-in-change",
								label: "Text Input (updates on change)",
								type: "text"
							},
							value: textVal
						}))
					]),
					m(".w-50.pa2.ba.b--silver", m(uiWidgets.BaseText, {
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
					m(".w-50.pa2.mr2.ba.b--silver", m(uiWidgets.BaseInput, {
						field: {
							id: "date-in",
							label: "Date Input",
							type: "date"
						},
						value: dateVal
					})),
					m(".w-50.pa2.ba.b--silver", m(uiWidgets.BaseText, {
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
					m(".w-50.pa2.mr2.ba.b--silver", m(uiWidgets.BaseInput, {
						field: {
							id: "color-in",
							label: "Colour Input",
							type: "color"
						},
						value: colVal
					})),
					m(".w-50.pa2.ba.b--silver", m(uiWidgets.BaseText, {
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
					m(".w-50.pa2.mr2.ba.b--silver", m(uiWidgets.CheckboxInput, {
						field: {
							id: "check-in",
							label: "Checkbox Input",
							type: "checkbox",
							classes: "pa2"
						},
						value: checkVal
					})),
					m(".w-50.pa2.ba.b--silver", m(uiWidgets.Checkbox, {
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
					m(".w-50.pa2.mr2.ba.b--silver", m(uiWidgets.SelectInput, {
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
					m(".w-50.pa2.ba.b--silver", m(uiWidgets.RadioInput, {
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
							}],
							classes: "pa2"
						},
						value: optVal
					}))
				]),

				m("h3", "Files"),
				m("p", "These file widgets operate on a single file array stream"),

				// FileSelect/FileList
				m(".mw8.flex.mb2", [
					m(".w-50.pa2.mr2.ba.b--silver", m(uiWidgets.FileSelect, {
						field: {
							id: "file-in",
							label: "File Input",
							type: "file"
						},
						value: fileList
					})),
					m(".w-50.pa2.ba.b--silver", m(uiWidgets.FileList, {
						field: {
							id: "image-out",
							label: "File Output",
							type: "file"
						},
						value: fileList
					}))
				]),
				m(uiWidgets.Button, {
					label: "Log File to Console",
					icon: "fa-print",
					classes: "mb2",
					onclick: () => console.log(fileList())
				}),

				// ImageMulti/FileList
				m(".mw8.flex.mb2", [
					m(".w-50.pa2.mr2.ba.b--silver", m(uiWidgets.ImageMulti, {
						field: {
							id: "image-in",
							label: "Image Input",
							type: "imageMulti"
						},
						value: imgList
					})),
					m(".w-50.pa2.ba.b--silver", m(uiWidgets.FileList, {
						field: {
							id: "image-out",
							label: "Image List Output",
							type: "fileMulti"
						},
						value: imgList
					}))
				]),
				m(uiWidgets.Button, {
					label: "Log Image List to Console",
					icon: "fa-print",
					classes: "mb2",
					onclick: () => console.log(imgList())
				}),

				// SignBuilder/ImagePreview
				m(".mw8.flex.mb2", [
					m(".w-50.pa2.mr2.ba.b--silver", m(uiWidgets.SignBuilder, {
						field: {
							id: "sign-in",
							label: "Signature Input",
							type: "sign"
						},
						value: signList
					})),
					m(".w-50.pa2.ba.b--silver", m(uiWidgets.ImagePreview, {
						field: {
							id: "sign-out",
							label: "Signature File Output",
							type: "fileMulti"
						},
						value: signList
					}))
				]),
				m(uiWidgets.Button, {
					label: "Log Signature to Console",
					icon: "fa-print",
					classes: "mb2",
					onclick: () => console.log(signList())
				})

			]);
		}
	});
});
