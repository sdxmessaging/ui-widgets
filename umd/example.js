'use strict';

var stream = m.stream;

uiWidgets.updateConfig({
	signFont: "Caveat",
	// requiredLblPost: "*"
});

uiWidgets.updateClasses({ invalidInputWrapper: "b--red" });

uiWidgets.updateButtonContext({
	invert: "bg-dark-gray light-blue b--light-blue",
	warn: "bg-orange black ph3 pv2 ba br-pill b--black b--dashed"
});

// Simple props
var textVal = stream("");
var currencyVal = stream();
var dateVal = stream();
var dateFormat = stream("default");
var cardVal = stream();
var colVal = stream("#cc0011");
var labVal = stream("hello");
var checkVal = stream();
var optVal = stream();
var faceVal = stream();
var toggleVal = stream();
var passVal = stream();
// Transform
var xformValIn = stream("");
var xformValOut = xformValIn.map(function (val) {
	return val.toUpperCase();
});

// Custom
var value = stream("");
var label = stream("Custom Input");
var type = stream("text");
var placeholder = stream("Placeholder");
var readonly = stream(false);
var disabled = stream(false);
var displayFileList = stream(false);
// Files
var fileButtonList = stream([]);
var fileList = stream([]);
var imgList = stream([]);
var imgInputList = stream([]);
var signList = stream([]);
var omniInputList = stream([]);
var multiOmniInputList = stream([]);

// Layout
var layoutVal = stream("floatLabel");
layoutVal.map(function (newVal) {
	uiWidgets.updateConfig({
		layoutType: newVal
	});
});

// Theme
var themeWrapper = stream(uiWidgets.theme.wrapper);
themeWrapper.map(function (newCls) {
	uiWidgets.updateClasses({ wrapper: newCls });
});
var themeLabel = stream(uiWidgets.theme.label);
themeLabel.map(function (newCls) {
	uiWidgets.updateClasses({ label: newCls });
});
var themeInputWrapper = stream(uiWidgets.theme.inputWrapper);
themeInputWrapper.map(function (newCls) {
	uiWidgets.updateClasses({ inputWrapper: newCls });
});
var themeInput = stream(uiWidgets.theme.input);
themeInput.map(function (newCls) {
	uiWidgets.updateClasses({ input: newCls });
});

var themeRequired = stream(uiWidgets.theme.requiredLabel);
themeRequired.map(function (newCls) {
	uiWidgets.updateClasses({ requiredLabel: newCls });
});
var themeDisabled = stream(uiWidgets.theme.disabledWrapper);
themeDisabled.map(function (newCls) {
	uiWidgets.updateClasses({ disabledWrapper: newCls });
});

var themeBtn = stream(uiWidgets.theme.button);
themeBtn.map(function (newCls) {
	uiWidgets.updateClasses({ button: newCls });
});
var themeNavBtn = stream(uiWidgets.theme.navButton);
themeNavBtn.map(function (newCls) {
	uiWidgets.updateClasses({ navButton: newCls });
});

m.mount(document.getElementById("page"), {
	view: function () {
		return m(".mw8.ph4.mv5.center", [

			// Navbar
			m(".flex.flex-column.flex-row-l.items-center.fixed.top-0.right-0.bg-near-white.z-max", [
				m(uiWidgets.NavLink, {
					label: "Basic Usage",
					icon: "fas fa-home",
					href: "#basic"
				}),
				m(uiWidgets.NavLink, {
					label: "Buttons",
					icon: "fas fa-arrow-circle-right",
					href: "#button"
				}),
				m(uiWidgets.NavLink, {
					label: "Customise",
					icon: "fas fa-edit",
					href: "#custom"
				}),
				m(uiWidgets.NavLink, {
					label: "File Support",
					icon: "fas fa-file-alt",
					href: "#files"
				}),
				m(uiWidgets.NavLink, {
					label: "Theme Support",
					icon: "fas fa-paint-roller",
					href: "#theme"
				}),

				m(".mh2.flex.items-center", [
					m("i.fa.fa-tags.mh2"),
					m("span", "Type"),
					m(uiWidgets.SelectInput, {
						field: {
							id: "layout-in",
							options: [{
								label: "Basic",
								value: "default"
							}, {
								label: "Animated",
								value: "floatLabel"
							}, {
								label: "Fixed",
								value: "floatAlways"
							}],
							uiClass: {
								inputWrapper: "bn"
							}
						},
						value: layoutVal
					})
				])
			]),

			m("h2", "ui-widgets"),

			m("h3", m("a#basic.link[href=#basic]", "Basic Usage")),
			m("p", "Display components reflect changes made to the stream by input components. A value stream can be used by multiple input components, values stay in sync with no additional code."),
			m("p", "Inputs can apply additional classes if they fail validation."),

			// Text
			m(".flex.mb2.items-center.ba.b--silver", [

				m(".flex.flex-column.w-50", [
					m(".pa2.mb2", m(uiWidgets.BaseInput, {
						field: {
							id: "text-in-input",
							label: "Text Input (updates on input)",
							required: true,
							instant: true
						},
						value: textVal,
					})),
					m(".pa2", m(uiWidgets.TextareaInput, {
						field: {
							id: "text-area-input",
							label: "Text Area (updates on change)",
							type: "textarea"
						},
						value: textVal,
					})),
				]),

				m(".w-50.pa2", m(uiWidgets.BaseText, {
					field: {
						id: "text-out",
						label: "Text Output"
					},
					value: textVal
				}))
			]),

			// Date
			m(".flex.mb2.items-center.ba.b--silver", [
				m(".flex.flex-column.w-50", [
					m(".pa2.mb2", m(uiWidgets.BaseInput, {
						field: {
							id: "date-in",
							label: "Date Input (Browser Default)",
							type: "date"
						},
						value: dateVal
					})),
					m(".pa2", [
						m(uiWidgets.DateInput, {
							field: {
								id: "dob-in",
								label: "Date Input (ui-widgets Bespoke)",
								options: [{ value: dateFormat() }]
							},
							value: dateVal
						}),
						m(uiWidgets.RadioInput, {
							field: {
								id: "date-format-in",
								label: "Date input format",
								uiClass: {
									wrapper: "fr mt2",
									inputWrapper: "f6"
								},
								options: [
									{ label: "Default", value: "default" },
									{ label: "GB", value: "en-GB" },
									{ label: "US", value: "en-US" },
									{ label: "Switzerland", value: "fr-CH" },
									{ label: "Egypt", value: "ar-EG" },
									{ label: "Korea", value: "ko-KR" },
									{ label: "Japan", value: "ja-JP" }
								]
							},
							value: dateFormat
						})
					])
				]),

				m(".w-50.pa2", m(uiWidgets.DateText, {
					field: {
						id: "date-out",
						label: "Date Output",
					},
					value: dateVal
				}))
			]),

			// Colour
			m(".flex.mb2.ba.b--silver", [
				m(".w-50.pa2", m(uiWidgets.BaseInput, {
					field: {
						id: "color-in",
						label: "Colour Input",
						type: "color"
					},
					value: colVal
				})),
				m(".w-50.pa2", m(uiWidgets.BaseText, {
					field: {
						id: "color-out",
						label: "Colour Output",
					},
					value: colVal
				}))
			]),

			m(".flex.mb2.ba.b--silver", [
				m(".w-50.pa2", m(uiWidgets.Label, {
					field: {
						id: "label",
						label: "Label"
					},
					value: labVal
				})),
				m(".w-50.pa2", m(uiWidgets.BaseText, {
					field: {
						id: "label-out",
						label: "Label Output",
					},
					value: labVal
				}))
			]),



			// Password
			m(".flex.mb2.ba.b--silver", [
				m(".w-50.pa2", m(uiWidgets.PasswordInput, {
					field: {
						id: "password-in",
						label: "Password Input",
						instant: true
					},
					value: passVal
				})),
				m(".w-50.pa2", m(uiWidgets.PasswordStrength, {
					field: {
						id: "password-in-strength",
						label: "Password Strength"
					},
					value: passVal
				}))
			]),

			m("p", "Checkbox and Toggle inputs support conditional labels based on their value."),

			// Checkbox
			m(".flex.mb2.ba.b--silver", [
				m(".w-50.pa2", m(uiWidgets.CheckboxInput, {
					field: {
						id: "check-in",
						label: "Checkbox Input"
					},
					value: checkVal
				})),
				m(".w-50.pa2", m(uiWidgets.Checkbox, {
					field: {
						id: "check-out",
						label: "Checkbox Output",
						options: [{
							label: "Unset", value: false
						}]
					},
					value: checkVal
				}))
			]),

			// Toggle
			m(".flex.mb2.ba.b--silver", [
				m(".w-50.pa2", m(uiWidgets.ToggleInput, {
					field: {
						id: "toggle-in",
						label: "Toggle Input",
						options: [{
							label: "On", value: true
						}, {
							label: "Off", value: false
						}]
					},
					value: toggleVal
				})),
				m(".w-50.pa2", m(uiWidgets.Toggle, {
					field: {
						id: "toggle-out",
						label: "Toggle Output",
						options: [{
							label: "On", value: true
						}]
					},
					value: toggleVal
				}))
			]),

			// Select/Radio
			m(".flex.mb2.items-center.ba.b--silver", [
				m(".flex.flex-column.w-50", [
					m(".pa2.mb2", m(uiWidgets.SelectInput, {
						field: {
							id: "select-in",
							label: "Select Input",
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
					m(".pa2", m(uiWidgets.RadioInput, {
						field: {
							id: "radio-in",
							label: "Radio Input",
							type: "radio",
							options: [{
								value: "1",
								label: "Opt 1"
							}, {
								value: "2",
								label: "Opt 2"
							}]
						},
						value: optVal
					}))
				]),
				m(".w-50.pa2", m(uiWidgets.BaseText, {
					field: {
						id: "select-radio-out",
						label: "Select/Radio Output"
					},
					value: optVal
				}))
			]),

			m("p", "The currency input stores values as the smallest monetary unit"),

			// Currency/Number
			m(".flex.mb2.ba.b--silver", [
				m(".w-50.pa2", m(uiWidgets.CurrencyInput, {
					field: {
						id: "currency-in-currency",
						label: "Currency Input",
						options: [{
							value: "£"
						}]
					},
					value: currencyVal
				})),
				m(".w-50.pa2", m(uiWidgets.BaseInput, {
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
			m(".flex.mb2.ba.b--silver", [
				m(".w-50.pa2", m(uiWidgets.CardDateInput, {
					field: {
						id: "card-in-date",
						label: "Card Expiry MM/YY"
					},
					value: cardVal
				})),
				m(".w-50.pa2", m(uiWidgets.BaseInput, {
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
			m(".flex.mb2.ba.b--silver", [
				m(".w-50.pa2", m(uiWidgets.BaseInput, {
					field: {
						id: "xform-in-simple",
						label: "Input Stream",
						instant: true
					},
					value: xformValIn
				})),
				m(".w-50.pa2", m(uiWidgets.BaseInput, {
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
					icon: "fas fa-arrow-circle-down",
					rightIcon: "fas fa-arrow-circle-down",
					classes: "ma1",
					onclick: function () {
						console.log("Button Click");
					}
				}),
				m(uiWidgets.Button, {
					label: "Disabled Button",
					classes: "ma1",
					disabled: true
					// onclick event will not fire on a disabled button
				}),
				m(uiWidgets.ButtonLink, {
					label: "Link Button",
					icon: "fas fa-link",
					classes: "ma1",
					href: "#button"
				}),
				m(uiWidgets.NavButton, {
					label: "Nav Button",
					icon: "fas fa-arrow-circle-up",
					classes: "ma1",
					onclick: function () {
						console.log("Nav Button Click");
					}
				}),
				m(uiWidgets.NavLink, {
					label: "Nav Link",
					rightIcon: "fas fa-link",
					classes: "ma1",
					href: "#button"
				})
			]),

			m("p", "Additional button themes can also be registered"),

			m(".flex.flex-wrap.mb1.nl1.nt1.nr1", [
				m(uiWidgets.Button, {
					label: "Inverted",
					rightIcon: "fas fa-recycle",
					context: "invert",
					classes: "ma1"
				}),
				m(uiWidgets.Button, {
					label: "Warning",
					icon: "fas fa-exclamation-triangle",
					context: "warn",
					classes: "ma1"
				}),
				m(uiWidgets.ButtonLink, {
					label: "Link Inverted",
					icon: "fas fa-link",
					classes: "ma1",
					context: "invert",
					href: "#button"
				}),
			]),

			m("h3", m("a#custom.link[href=#custom]", "Customise")),
			m("p", "Widget options are simple to update"),

			// Custom BaseInput
			m(".flex.mb2.items-center.ba.b--silver", [
				m(".flex.flex-column.w-50", [
					m(".pa2.mb2", m(uiWidgets.BaseInput, {
						field: {
							id: "custom-label",
							label: "Label",
							instant: true
						},
						value: label
					})),
					m(".pa2.mb2", m(uiWidgets.SelectInput, {
						field: {
							id: "custom-type",
							label: "Type",
							options: [{
								label: "Text",
								value: "text"
							}, {
								label: "Password",
								value: "password"
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
							}, {
								label: "Hidden",
								value: "hidden"
							}]
						},
						value: type
					})),
					m(".pa2.mb2", m(uiWidgets.BaseInput, {
						field: {
							id: "custom-placeholder",
							label: "Placeholder",
							instant: true
						},
						value: placeholder
					})),
					m(".pa2.mb2", m(uiWidgets.CheckboxInput, {
						field: {
							id: "custom-readonly",
							label: "Readonly"
						},
						value: readonly
					})),
					m(".pa2.mb2", m(uiWidgets.CheckboxInput, {
						field: {
							id: "custom-disabled",
							label: "Disabled"
						},
						value: disabled
					}))
				]),
				m(".w-50.pa2", m(uiWidgets.BaseInput, {
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

			m(".flex.mb2.ba.b--silver", [
				m(".w-50.pa2", m(uiWidgets.FileButtonSelect, {
					field: {
						id: "file-button-in",
						label: "File Button Input",
						// uiClass: {
						// 	inputWrapper: "dib"
						// }
					},
					value: fileButtonList
				})),
				m(".w-50.pa2", m(uiWidgets.FileList, {
					field: {
						id: "file-button-out",
						label: "File Button Output"
					},
					value: fileButtonList
				}))
			]),

			m(".flex.mb2.ba.b--silver", [
				m(".w-50.pa2", m(uiWidgets.FileSelect, {
					field: {
						id: "file-in",
						label: "File Input"
					},
					value: fileList,
					displayType: "none"
				})),
				m(".w-50.pa2", m(uiWidgets.FileList, {
					field: {
						id: "image-out",
						label: "File Output"
					},
					value: fileList
				}))
			]),
			m(uiWidgets.Button, {
				label: "Log File to Console",
				icon: "fas fa-print",
				classes: "mb2",
				onclick: function () {
					console.log(fileList());
				}
			}),

			m("p", "The OmniFileInput widget behaves like a file or image input based on the type of file set"),

			m(".flex.mb2.ba.b--silver", [
				m(".w-50.pa2", m(uiWidgets.OmniFileInput, {
					field: {
						id: "omni-file-in",
						label: "Omni File Input"
					},
					value: omniInputList
				})),
				m(".w-50.pa2", m(uiWidgets.FileList, {
					field: {
						id: "omni-file-out",
						label: "File List Output"
					},
					value: omniInputList
				}))
			]),

			m("p", "MultiOmniFileInput, widget to accept all types of files and either display the image or list the file name based on the displayType provided. Display portion of widget can also be hidden."),

			m(".flex.mb2.ba.b--silver", [
				m(".w-50.pa2", m(uiWidgets.MultiOmniFileInput, {
					field: {
						id: "multi-omni-file-in",
						label: "Multiple Omni File Input"
					},
					showDisplay: true,
					displayType: "thumbnail",
					value: multiOmniInputList,
				}),
				),
				m(".w-50.pa2", m(uiWidgets.FileList, {
					field: {
						id: "multi-omni-file-out",
						label: "Multiple Omni File Output"
					},
					value: multiOmniInputList
				})),
			]),

			m("p", "Image inputs can enforce a maximum size, scaling down larger images"),

			// ImageSelect/FileList
			m(".flex.mb2.ba.b--silver", [
				m(".w-50.pa2", m(uiWidgets.ImageSelect, {
					field: {
						id: "image-in",
						label: "Image Select Input"
					},
					value: imgInputList
				})),
				m(".w-50.pa2", m(uiWidgets.FileList, {
					field: {
						id: "image-out",
						label: "File List Output"
					},
					value: imgInputList
				}))
			]),

			m(uiWidgets.Button, {
				label: "Log Image Select to Console",
				icon: "fas fa-print",
				classes: "mb2",
				onclick: function () {
					console.log(imgInputList());
				}
			}),

			// ImageMulti/ImageList
			m(".flex.mb2.ba.b--silver", [
				m(".w-50.pa2", m(uiWidgets.ImageMulti, {
					field: {
						id: "image-multi-in",
						label: "Image List Input"
					},
					value: imgList
				})),
				m(".w-50.pa2", m(uiWidgets.ImageList, {
					field: {
						id: "image-multi-out",
						label: "Image List Output"
					},
					value: imgList
				}))
			]),

			m(uiWidgets.Badge, { label: imgList().length },
				m(uiWidgets.Button, {
					label: "Log Image List to Console",
					icon: "fas fa-print",
					classes: "mb2",
					onclick: function () {
						console.log(imgList());
					}
				})
			),

			// SignBuilder/ImagePreview
			m(".flex.mb2.ba.b--silver", [
				m(".w-50.pa2", m(uiWidgets.SignBuilder, {
					field: {
						id: "sign-in",
						label: "Signature Input",
						heightPct: 20,
						stampTxt: "Apply Stamp",
						stampSetTxt: "Signature"
					},
					value: signList
				})),
				m(".w-50.pa2", m(uiWidgets.ImagePreview, {
					field: {
						id: "sign-out",
						label: "Signature File Output"
					},
					value: signList
				}))
			]),

			m(uiWidgets.Button, {
				label: "Log Signature to Console",
				icon: "fas fa-print",
				classes: "mb2",
				onclick: function () {
					console.log(signList());
				}
			}),

			m("h3", m("a#theme.link[href=#theme]", "Theme Support")),
			m("p", "Update theme classes on the fly and use your existing css"),
			m("p", "Try other available classes from ",
				m("a[href=https://tachyons.io/][target=_blank]", "Tachyons css")
			),

			// Buttons
			m(".flex.mb2", [
				m(".w-50.pa2", m(uiWidgets.BaseInput, {
					field: {
						id: "theme-button",
						label: "Button",
						required: true
					},
					value: themeBtn
				})),
				m(".w-50.pa2", m(uiWidgets.BaseInput, {
					field: {
						id: "theme-nav-button",
						label: "Nav Button",
						required: true
					},
					value: themeNavBtn
				}))
			]),

			// Inputs
			m(".flex.mb2", [
				m(".w-50.pa2", m(uiWidgets.BaseInput, {
					field: {
						id: "theme-wrapper",
						label: "Widget Wrapper"
					},
					value: themeWrapper
				})),
				m(".w-50.pa2", m(uiWidgets.BaseInput, {
					field: {
						id: "theme-label",
						label: "Widget Label",
						required: true
					},
					value: themeLabel
				}))
			]),
			m(".flex.mb2", [
				m(".w-50.pa2", m(uiWidgets.BaseInput, {
					field: {
						id: "theme-input-wrapper",
						label: "Input Wrapper",
						required: true
					},
					value: themeInputWrapper
				})),
				m(".w-50.pa2", m(uiWidgets.BaseInput, {
					field: {
						id: "theme-input",
						label: "Input",
						required: true
					},
					value: themeInput
				}))
			]),

			// Required/disabled
			m(".flex.mb2", [
				m(".w-50.pa2", m(uiWidgets.BaseInput, {
					field: {
						id: "required-label",
						label: "Required Label"
					},
					value: themeRequired
				})),
				m(".w-50.pa2", m(uiWidgets.BaseInput, {
					field: {
						id: "disabled-wrapper",
						label: "Disabled Wrapper"
					},
					value: themeDisabled
				}))
			]),

			m("h3", m("a#closing.link[href=#closing]", "Thanks")),
			m("p", "We hope you like these widgets"),

			// Feedback
			m(uiWidgets.RadioInput, {
				field: {
					id: "feedback-in",
					label: "We value your feedback",
					uiClass: {
						label: "ml5 ph2 bg-near-white ba br-pill",
						inputWrapper: "flex bg-near-white br-pill",
						input: "flex-auto pa2 bg-animate br-pill tc"
					},
					options: [{
						value: "1",
						label: "Very unsatisfied",
						icon: "fas fa-angry fa-2x"
					}, {
						value: "2",
						label: "Unsatisfied",
						icon: "fas fa-frown fa-2x"
					}, {
						value: "3",
						label: "Neutral",
						icon: "fas fa-meh fa-2x"
					}, {
						value: "4",
						label: "Satisfied",
						icon: "fas fa-smile fa-2x"
					}, {
						value: "5",
						label: "Very satisfied",
						icon: "fas fa-grin-beam fa-2x"
					}]
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

		]);
	}

});
