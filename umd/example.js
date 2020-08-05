'use strict';

var stream = m.stream;

uiWidgets.updateConfig({
	signFont: "Caveat"
});

uiWidgets.updateButtonContext({
	invert: "bg-dark-gray light-blue pa2 ba br2 b--light-blue",
	warn: "bg-orange black ph3 pv2 ba br-pill b--black b--dashed"
});

// Simple props
var textVal = stream("Text");
var currencyVal = stream();
var dateVal = stream();
var dateUsFormat = stream();
var cardVal = stream();
var colVal = stream("#cc0011");
var checkVal = stream();
var optVal = stream();
var faceVal = stream();

// Transform
var xformValIn = stream("");
var xformValOut = xformValIn.map((val) => val.toUpperCase());

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
			m(uiWidgets.NavLink, {
				label: "Basic Usage",
				icon: "fa-home",
				href: "#basic"
			}),
			m(uiWidgets.NavLink, {
				label: "Buttons",
				icon: "fa-arrow-circle-right",
				href: "#button"
			}),
			m(uiWidgets.NavLink, {
				label: "Customise",
				icon: "fa-edit",
				href: "#custom"
			}),
			m(uiWidgets.NavLink, {
				label: "File Support",
				icon: "fa-file-alt",
				href: "#files"
			}),
			m(uiWidgets.NavLink, {
				label: "Theme Support",
				icon: "fa-paint-roller",
				href: "#theme"
			})
		]),

		m("h2", "ui-widgets"),

		m("h3", m("a#basic.link[href=#basic]", "Basic Usage")),
		m("p", "Display components reflect changes made to the stream by input components. A value stream can be used by multiple input components, values stay in sync with no additional code."),

		// Text
		m(".flex.mb2.items-center", [
			m(".flex.flex-column.w-50.mr2", [
				m(".pa2.mb2.ba.b--silver", m(uiWidgets.BaseInput, {
					field: {
						id: "text-in-input",
						label: "Text Input (updates on input)",
						instant: true
					},
					value: textVal
				})),
				m(".pa2.ba.b--silver", m(uiWidgets.BaseInput, {
					field: {
						id: "text-in-change",
						label: "Text Input (updates on change)"
					},
					value: textVal
				}))
			]),
			m(".w-50.pa2.ba.b--silver", m(uiWidgets.BaseText, {
				field: {
					id: "text-out",
					label: "Text Output"
				},
				value: textVal
			}))
		]),

		// Date
		m(".flex.mb2.items-center", [
			m(".flex.flex-column.w-50.mr2", [
				m(".pa2.mb2.ba.b--silver", m(uiWidgets.BaseInput, {
					field: {
						id: "date-in",
						label: "Date Input (Browser Default)",
						type: "date",
					},
					value: dateVal
				})),
				m(".pa2.ba.b--silver", [
					m(uiWidgets.DateInput, {
						field: {
							id: "dob-in",
							label: "Date Input (ui-widgets Bespoke)",
							options: dateUsFormat() ? [{ value: "en-US" }] : undefined
						},
						value: dateVal
					}),
					m(uiWidgets.CheckboxInput, {
						field: {
							id: "en-us-in",
							label: "en-US input order",
							classes: "fr f6"
						},
						value: dateUsFormat
					})
				])
			]),
			m(".w-50.pa2.ba.b--silver", m(uiWidgets.BaseText, {
				field: {
					id: "date-out",
					label: "Date Output"
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
					label: "Colour Output"
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
					classes: "pa2"
				},
				value: checkVal
			})),
			m(".w-50.pa2.ba.b--silver", m(uiWidgets.Checkbox, {
				field: {
					id: "check-out",
					label: "Checkbox Output"
				},
				value: checkVal
			}))
		]),

		// Select/Radio
		m(".flex.mb2.items-center", [
			m(".flex.flex-column.w-50.mr2", [
				m(".pa2.mb2.ba.b--silver", m(uiWidgets.SelectInput, {
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
				m(".pa2.ba.b--silver", m(uiWidgets.RadioInput, {
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
			m(".w-50.pa2.ba.b--silver", m(uiWidgets.BaseText, {
				field: {
					id: "select-radio-out",
					label: "Select/Radio Output"
				},
				value: optVal
			}))
		]),

		m("p", "The currency input stores values as the smallest monetary unit"),

		// Currency/Number
		m(".flex.mb2", [
			m(".w-50.pa2.mr2.ba.b--silver", m(uiWidgets.CurrencyInput, {
				field: {
					id: "currency-in-currency",
					label: "Currency Input",
					options: [{
						value: "£"
					}]
				},
				value: currencyVal
			})),
			m(".w-50.pa2.ba.b--silver", m(uiWidgets.BaseInput, {
				field: {
					id: "currency-in-number",
					label: "Smallest Monetary Unit",
					type: "number"
				},
				value: currencyVal
			}))
		]),
		m("p.mt1.f6.orange", "Note: Values beyond Number.MAX_SAFE_INTEGER have undefined behaviour and display/input values will have their absolute value taken"),

		// Card Date
		m(".flex.mb2", [
			m(".w-50.pa2.mr2.ba.b--silver", m(uiWidgets.CardDateInput, {
				field: {
					id: "card-in-date",
					label: "Card Expiry MM/YY"
				},
				value: cardVal
			})),
			m(".w-50.pa2.ba.b--silver", m(uiWidgets.BaseInput, {
				field: {
					id: "card-in-text",
					label: "Card Expiry Plain Text",
					type: "text"
				},
				value: cardVal
			}))
		]),

		m("p", "Perform custom transforms by mapping the input stream to a new value"),
		m("p", "Note that a transform stream value is fed back into the initial value on each update"),

		// xform
		m(".flex.mb2", [
			m(".w-50.pa2.mr2.ba.b--silver", m(uiWidgets.BaseInput, {
				field: {
					id: "xform-in-simple",
					label: "Input Stream",
					instant: true
				},
				value: xformValIn
			})),
			m(".w-50.pa2.ba.b--silver", m(uiWidgets.BaseInput, {
				field: {
					id: "xform-in-xform",
					label: "Input Stream + Transform Stream (toUpperCase)",
					instant: true
				},
				value: xformValIn,
				xform: xformValOut
			}))
		]),

		m("h3", m("a#button.link[href=#button]", "Buttons")),
		m("p", "Buttons are available in standard and hyperlink variants"),

		m(".flex.flex-wrap.mb1.nl1.nt1.nr1", [
			m(uiWidgets.Button, {
				label: "Simple Button",
				icon: "fa-arrow-circle-down",
				rightIcon: "fa-arrow-circle-down",
				classes: "ma1",
				onclick: () => console.log("Button Click")
			}),
			m(uiWidgets.ButtonLink, {
				label: "Link Button",
				icon: "fa-link",
				classes: "ma1",
				href: "#button"
			}),
			m(uiWidgets.NavButton, {
				label: "Nav Button",
				icon: "fa-arrow-circle-up",
				classes: "ma1",
				onclick: () => console.log("Nav Button Click")
			}),
			m(uiWidgets.NavLink, {
				label: "Nav Link",
				rightIcon: "fa-link",
				classes: "ma1",
				href: "#button"
			})
		]),

		m("p", "Additional button themes can also be registered"),

		m(".flex.flex-wrap.mb1.nl1.nt1.nr1", [
			m(uiWidgets.Button, {
				label: "Inverted",
				rightIcon: "fa-recycle",
				context: "invert",
				classes: "ma1"
			}),
			m(uiWidgets.Button, {
				label: "Warning",
				icon: "fa-exclamation-triangle",
				context: "warn",
				classes: "ma1"
			}),
			m(uiWidgets.ButtonLink, {
				label: "Link Inverted",
				icon: "fa-link",
				classes: "ma1",
				context: "invert",
				href: "#button"
			}),
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
							label: "Date Time",
							value: "datetime-local"
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
						}, {
							label: "Range",
							value: "range"
						}]
					},
					value: type
				})),
				m(".pa2.mb2.ba.b--silver", m(uiWidgets.BaseInput, {
					field: {
						id: "custom-placeholder",
						label: "Placeholder",
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
					heightPct: 20
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
					label: "Label Colour"
				},
				value: lblCol
			})),
			m(".w-50.pa2.ba.b--silver", m(uiWidgets.BaseInput, {
				field: {
					id: "theme-label-fnt",
					label: "Label Font"
				},
				value: lblFnt
			}))
		]),

		// Inputs
		m(".flex.mb2", [
			m(".w-50.pa2.mr2.ba.b--silver", m(uiWidgets.BaseInput, {
				field: {
					id: "theme-input-col",
					label: "Input Colour"
				},
				value: inpCol
			})),
			m(".w-50.pa2.ba.b--silver", m(uiWidgets.BaseInput, {
				field: {
					id: "theme-input-brd",
					label: "Input Border"
				},
				value: inpBrd
			}))
		]),

		// Buttons
		m(".flex.mb2", [
			m(".w-50.pa2.mr2.ba.b--silver", m(uiWidgets.BaseInput, {
				field: {
					id: "theme-button-bg",
					label: "Button Background Colour"
				},
				value: btnBg
			})),
			m(".w-50.pa2.ba.b--silver", m(uiWidgets.BaseInput, {
				field: {
					id: "theme-button-brd",
					label: "Button Border"
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
