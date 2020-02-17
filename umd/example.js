'use strict';

var stream = m.stream;

uiWidgets.updateConfig({
	signFont: "Caveat"
});

// Simple props
var textVal = stream("Text");
var dateVal = stream();
var colVal = stream("#cc0011");
var checkVal = stream();
var optVal = stream();
var faceVal = stream();

// Custom
var value = stream("");
var label = stream("Custom Input");
var type = stream("text");
var placeholder = stream("Placeholder");
var readonly = stream(false);
var disabled = stream(false);

// Files
var fileList = stream([]);
var imgList = stream([]);
var signList = stream([]);

// Theme
var lblCol = stream("silver");
lblCol.map((newCls) => uiWidgets.updateTheme({ lblCol: newCls }));
var lblFnt = stream("f6");
lblFnt.map((newCls) => uiWidgets.updateTheme({ lblFnt: newCls }));

var inpCol = stream("dark-gray");
inpCol.map((newCls) => uiWidgets.updateTheme({ inpCol: newCls }));
var inpBrd = stream("bn");
inpBrd.map((newCls) => uiWidgets.updateTheme({ inpBrd: newCls }));

var btnBg = stream("bg-light-blue");
btnBg.map((newCls) => uiWidgets.updateTheme({ btnBg: newCls }));
var btnBrd = stream("bn br2");
btnBrd.map((newCls) => uiWidgets.updateTheme({ btnBrd: newCls }));

m.mount(document.getElementById("page"), {
	view: () => m(".mw8.pa3.mb5.center", [

		m(".flex.flex-column.flex-row-l.fixed.top-0.right-0.bg-near-white", [
			m(uiWidgets.NavButton, {
				label: "Basic Usage",
				icon: "fa-home",
				onclick: () => window.location.hash = "basic"
			}),
			m(uiWidgets.NavButton, {
				label: "Customise",
				icon: "fa-edit",
				onclick: () => window.location.hash = "custom"
			}),
			m(uiWidgets.NavButton, {
				label: "File Support",
				icon: "fa-file-alt",
				onclick: () => window.location.hash = "files"
			}),
			m(uiWidgets.NavButton, {
				label: "Theme Support",
				icon: "fa-pencil-ruler",
				onclick: () => window.location.hash = "theme"
			})
		]),

		m("h2", "ui-widgets"),

		m("h3", m("a#basic.link[href=#basic]", "Basic Usage")),
		m("p", "Display components reflect changes made to the stream by input components. A stream can be used by multiple input components."),

		// Text
		m(".flex.mb2.items-center", [
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
		m(".flex.mb2", [
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
		m(".flex.mb2", [
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
		m(".flex.mb2", [
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

		m("p", "Similar inputs can easily share a stream"),

		// Select/Radio
		m(".flex.mb2", [
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
					classes: "pa2",
					options: [{
						value: "1",
						label: "Opt 1"
					}, {
						value: "2",
						label: "Opt 2"
					}],
				},
				value: optVal
			}))
		]),

		m("h3", m("a#custom.link[href=#custom]", "Customise")),
		m("p", "Widget options are simple to update"),

		// Custom BaseInput
		m(".flex.mb2.items-center", [
			m(".flex.flex-column.w-50.mr2", [
				m(".pa2.mb2.ba.b--silver", m(uiWidgets.BaseInput, {
					field: {
						id: "custom-label",
						label: "Label",
						type: "text",
						instant: true
					},
					value: label
				})),
				m(".pa2.mb2.ba.b--silver", m(uiWidgets.SelectInput, {
					field: {
						id: "custom-type",
						label: "Type",
						type: "select",
						options: [{
							label: "Text",
							value: "text"
						}, {
							label: "Date",
							value: "date"
						}, {
							label: "Number",
							value: "number"
						}, {
							label: "Email",
							value: "email"
						}, {
							label: "Telephone",
							value: "tel"
						}, {
							label: "Color",
							value: "color"
						}]
					},
					value: type
				})),
				m(".pa2.mb2.ba.b--silver", m(uiWidgets.BaseInput, {
					field: {
						id: "custom-placeholder",
						label: "Placeholder",
						type: "text",
						instant: true
					},
					value: placeholder
				})),
				m(".pa2.mb2.ba.b--silver", m(uiWidgets.CheckboxInput, {
					field: {
						id: "custom-readonly",
						label: "Readonly",
						type: "checkbox"
					},
					value: readonly
				})),
				m(".pa2.mb2.ba.b--silver", m(uiWidgets.CheckboxInput, {
					field: {
						id: "custom-disabled",
						label: "Disabled",
						type: "checkbox"
					},
					value: disabled
				})),
			]),
			m(".w-50.pa2.ba.b--silver", m(uiWidgets.BaseInput, {
				field: {
					id: "custom-out",
					label: label(),
					type: type(),
					placeholder: placeholder(),
					readonly: readonly(),
					disabled: disabled()
				},
				value: value
			}))
		]),

		m("h3", m("a#files.link[href=#files]", "File Support")),
		m("p", "These file widgets operate on a single file array stream"),

		// FileSelect/FileList
		m(".flex.mb2", [
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

		m("p", "Image inputs can enforce a maximum size, scaling down larger images"),

		// ImageMulti/FileList
		m(".flex.mb2", [
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

		m(uiWidgets.Badge, { label: imgList().length },
			m(uiWidgets.Button, {
				label: "Log Image List to Console",
				icon: "fa-print",
				classes: "mb2",
				onclick: () => console.log(imgList())
			})
		),

		// SignBuilder/ImagePreview
		m(".flex.mb2", [
			m(".w-50.pa2.mr2.ba.b--silver", m(uiWidgets.SignBuilder, {
				field: {
					id: "sign-in",
					label: "Signature Input",
					type: "sign",
					heightPct: 12.5
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
		}),

		m("h3", m("a#theme.link[href=#theme]", "Theme Support")),
		m("p", "Update theme classes on the fly and use your existing css"),
		m("p", "Try other available classes from ",
			m("a[href=https://tachyons.io/][target=_blank]", "Tachyons css")
		),

		// Labels
		m(".flex.mb2", [
			m(".w-50.pa2.mr2.ba.b--silver", m(uiWidgets.BaseInput, {
				field: {
					id: "theme-label-col",
					label: "Label Colour",
					type: "text"
				},
				value: lblCol
			})),
			m(".w-50.pa2.ba.b--silver", m(uiWidgets.BaseInput, {
				field: {
					id: "theme-label-fnt",
					label: "Label Font",
					type: "text"
				},
				value: lblFnt
			}))
		]),

		// Inputs
		m(".flex.mb2", [
			m(".w-50.pa2.mr2.ba.b--silver", m(uiWidgets.BaseInput, {
				field: {
					id: "theme-input-col",
					label: "Input Colour",
					type: "text"
				},
				value: inpCol
			})),
			m(".w-50.pa2.ba.b--silver", m(uiWidgets.BaseInput, {
				field: {
					id: "theme-input-brd",
					label: "Input Border",
					type: "text"
				},
				value: inpBrd
			}))
		]),

		// Buttons
		m(".flex.mb2", [
			m(".w-50.pa2.mr2.ba.b--silver", m(uiWidgets.BaseInput, {
				field: {
					id: "theme-button-bg",
					label: "Button Background Colour",
					type: "text"
				},
				value: btnBg
			})),
			m(".w-50.pa2.ba.b--silver", m(uiWidgets.BaseInput, {
				field: {
					id: "theme-button-brd",
					label: "Button Border",
					type: "text"
				},
				value: btnBrd
			}))
		]),

		m("h3", m("a#closing.link[href=#closing]", "Thanks")),
		m("p", "We hope you like these widgets"),

		// Feedback
		m(uiWidgets.RadioInput, {
			field: {
				id: "feedback-in",
				label: "We value your feedback",
				type: "radio",
				containerClass: "justify-between bg-near-white br-pill",
				classes: "flex-auto justify-center pa2 bg-animate br-pill",
				// classes: "pa2",
				options: [{
					value: "1",
					label: "Very unsatisfied",
					icon: "fa-angry fa-2x"
				}, {
					value: "2",
					label: "Unsatisfied",
					icon: "fa-frown fa-2x"
				}, {
					value: "3",
					label: "Neutral",
					icon: "fa-meh fa-2x"
				}, {
					value: "4",
					label: "Satisfied",
					icon: "fa-smile fa-2x"
				}, {
					value: "5",
					label: "Very satisfied",
					icon: "fa-grin-beam fa-2x"
				}],
			},
			value: faceVal
		}),

		faceVal() ? m("p", Number.parseInt(faceVal()) < 4
			? [
				"Missing features? Room for improvement? Be sure to ",
				m("a.link[href=https://github.com/sdxmessaging/ui-widgets/issues][target=_blank]", "log an issue.")
			]
			: "We'll keep up the good work!"
		) : null

	])

});
