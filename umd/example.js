'use strict';

var stream = m.stream;

uiWidgets.updateConfig({
	signFont: "Caveat",
	// currencySymbol: "£"
	// requiredLblPost: "*",
	// optionalLblPost: " (optional)"
});

uiWidgets.updateClasses({
	invalidInputWrapper: "b--red ba",
	floatLabelPlaceholder: "o-40",
	requiredLabel: "bb b--red",
});

uiWidgets.updateButtonContext({
	invert: "bg-dark-gray light-blue b--light-blue",
	warn: "bg-orange black ph3 pv2 ba br-pill b--black b--dashed"
});

// Simple props
var textVal = stream();
var currencyVal = stream(-500);
var percentageVal = stream(-5000);
var dateVal = stream();
var dateFormat = stream("default");
var enableDatePicker = stream(false)
var dateFormatUiClass = { inputWrapper: "pa1 ma0", input: "f6", merge: false };
var cardVal = stream();
var colVal = stream("#cc0011");
var labVal = stream("Label");
var checkVal = stream();
var optVal = stream();
var faceVal = stream();
var faceValUiClass = {
	wrapper: "flex-auto bg-near-white br-pill ma1",
	input: "flex justify-center"
};
var toggleVal = stream();
var passVal = stream();
// Transform
var xformValIn = stream("");
var xformValOut = xformValIn.map((val) => val.toUpperCase());

// Custom
var value = stream("");
var label = stream("Custom Input");
var type = stream("text");
var placeholder = stream("Placeholder");
var required = stream(false);
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

var readonlyOrDisabled = stream(false);

// Layout
var layoutVal = stream("floatLabel");
layoutVal.map((newVal) => uiWidgets.updateConfig({ layoutType: newVal }));

// Theme
var themeWrapper = stream(uiWidgets.theme.wrapper);
themeWrapper.map((newCls) => uiWidgets.updateClasses({ wrapper: newCls }));
var themeLabel = stream(uiWidgets.theme.label);
themeLabel.map((newCls) => uiWidgets.updateClasses({ label: newCls }));
var themeInputWrapper = stream(uiWidgets.theme.inputWrapper);
themeInputWrapper.map((newCls) => uiWidgets.updateClasses({ inputWrapper: newCls }));
var themeInput = stream(uiWidgets.theme.input);
themeInput.map((newCls) => uiWidgets.updateClasses({ input: newCls }));

var themeRequired = stream(uiWidgets.theme.requiredLabel);
themeRequired.map((newCls) => uiWidgets.updateClasses({ requiredLabel: newCls }));
var themeDisabled = stream(uiWidgets.theme.disabledWrapper);
themeDisabled.map((newCls) => uiWidgets.updateClasses({ disabledWrapper: newCls }));

var themeBtn = stream(uiWidgets.theme.button);
themeBtn.map((newCls) => uiWidgets.updateClasses({ button: newCls }));
var themeNavBtn = stream(uiWidgets.theme.navButton);
themeNavBtn.map((newCls) => uiWidgets.updateClasses({ navButton: newCls }));

m.mount(document.getElementById("page"), {
	view: () => m(".mw8.ph4.mv5.center", [

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
							inputWrapper: "bn",
						}
					},
					value: layoutVal
				})
			])
		]),

		m("h2.flex.items-center", [
			"ui-widgets",
			m(uiWidgets.Tooltip, { message: ["Now with tooltip", "with the option for multiple lines"]})
		]),

		m("h3", m("a#basic.link[href=#basic]", "Basic Usage")),
		m("p", "Display components reflect changes made to the stream by input components. A value stream can be used by multiple input components, values stay in sync with no additional code."),
		m("p", "Inputs can apply additional classes if they fail validation."),

		// Text
		m(".flex.mb2.items-center.ba.b--silver", [

			m(".flex.flex-column.w-50.pa2", [
				m(uiWidgets.BaseInput, {
					field: {
						id: "text-in-input",
						label: {
							text: "Text Input",
							alt: "(updates on input)"
						},
						required: true,
						// pattern: "([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\\s?[0-9][A-Za-z]{2})",
						instant: true,
						uiClass: { invalidInputWrapper: "b--dashed" }
					},
					value: textVal
				}),
				m(uiWidgets.TextareaInput, {
					field: {
						id: "text-area-input",
						label: {
							text: "Text Area",
							alt: "(updates on change)"
						},
						type: "textarea"
					},
					value: textVal
				}),
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
			m(".flex.flex-column.w-50.pa2", [
				m(uiWidgets.BaseInput, {
					field: {
						id: "date-in",
						label: {
							text: "Date Input",
							alt: "(Browser Default)"
						},
						type: "date",
						uiClass: { wrapper: "mb2" }
					},
					value: dateVal
				}),
				m(uiWidgets.DateInput, {
					field: {
						id: "date-in-widget",
						label: {
							text: "Date Input",
							alt: "(ui-widgets Bespoke)"
						},
						required: true,
						disabled: !enableDatePicker(),
						uiClass: { wrapper: "mb2" },
						config: {
							dateLocale: dateFormat()
						}
					},
					value: dateVal
				}),
				m(uiWidgets.ToggleInput, {
					field: {
						id: "toggle-Flatpickr",
						label: "Enabled"
						// config: {
						// 	selectionLayout: ["label", "off", "icon", "on"],
						// 	selectionOnLabel: "Enabled",
						// 	selectionOffLabel: "Disabled",
						// 	selectionOnInactive: "o-40",
						// 	selectionOffInactive: "o-40",
						// 	toggleOffIcn: "fas fa-toggle-on fa-flip-horizontal"
						// }
					},
					value: enableDatePicker
				}),
				// Date locale
				m(".flex.flex-wrap.mb2", [
					m(uiWidgets.RadioInput, {
						field: {
							id: "date-format-default",
							label: "Default", value: "default",
							uiClass: dateFormatUiClass
						},
						value: dateFormat
					}),
					m(uiWidgets.RadioInput, {
						field: {
							id: "date-format-gb",
							label: "GB", value: "en-GB",
							uiClass: dateFormatUiClass
						},
						value: dateFormat
					}),
					m(uiWidgets.RadioInput, {
						field: {
							id: "date-format-us",
							label: "US", value: "en-US",
							uiClass: dateFormatUiClass
						},
						value: dateFormat
					}),
					m(uiWidgets.RadioInput, {
						field: {
							id: "date-format-ch",
							label: "Switzerland", value: "fr-CH",
							uiClass: dateFormatUiClass
						},
						value: dateFormat
					}),
					m(uiWidgets.RadioInput, {
						field: {
							id: "date-format-eg",
							label: "Egypt", value: "ar-EG",
							uiClass: dateFormatUiClass
						},
						value: dateFormat
					}),
					m(uiWidgets.RadioInput, {
						field: {
							id: "date-format-kr",
							label: "Korea", value: "ko-KR",
							uiClass: dateFormatUiClass
						},
						value: dateFormat
					}),
					m(uiWidgets.RadioInput, {
						field: {
							id: "date-format-jp",
							label: "Japan", value: "ja-JP",
							uiClass: dateFormatUiClass
						},
						value: dateFormat
					})
				]),

				m(uiWidgets.BaseInput, {
					field: {
						id: "date-in-text",
						label: {
							text: "Date Input",
							alt: "(text input)"
						}
					},
					value: dateVal
				})
			]),

			m(".w-50.pa2", m(uiWidgets.DateText, {
				field: {
					id: "date-out",
					label: "Date Output"
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
					required: true,
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

		m("p", "Checkbox, Toggle, and Radio inputs support conditional labels and classes based on their state."),

		// Checkbox
		m(".flex.mb2.ba.b--silver", [
			m(".w-50.pa2", m(uiWidgets.CheckboxInput, {
				field: {
					id: "check-in",
					label: "Checkbox Input",
					config: {
						selectionLayout: ["label", "icon", "on"],
						selectionOnLabel: "Checked",
					}
				},
				value: checkVal
			})),
			m(".w-50.pa2", m(uiWidgets.Checkbox, {
				field: {
					id: "check-out",
					label: "Checkbox Output",
					config: {
						selectionLayout: ["label", "icon", "off"],
						selectionOffLabel: "Unchecked"
					}
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
					required: true,
					// config: {
					// 	selectionLayout: ["icon", "on", "off"],
					// 	selectionOnLabel: "Toggle Input On",
					// 	selectionOffLabel: "Toggle Input Off"
					// }
				},
				value: toggleVal
			})),
			m(".w-50.pa2", m(uiWidgets.Toggle, {
				field: {
					id: "toggle-out",
					label: "Toggle Output",
					config: {
						selectionLayout: ["icon", "on", "off"],
						selectionOnLabel: "Toggle Input On",
						selectionOffLabel: "Toggle Input Off"
					},
				},
				value: toggleVal
			}))
		]),
		m(".flex.mb2.ba.b--silver", [
			m(".w-50.pa2", m(uiWidgets.ToggleInput, {
				field: {
					id: "toggle-in",
					label: "Toggle Input",
					// config: {
					// 	selectionLayout: ["label", "off", "icon", "on"],
					// 	selectionOnLabel: "On",
					// 	selectionOffLabel: "Off",
					// 	selectionOnInactive: "o-40",
					// 	selectionOffInactive: "o-40",
					// 	// toggleOffIcn: "fas fa-toggle-on fa-flip-horizontal"
					// }
				},
				value: toggleVal
			})),
			m(".w-50.pa2", m(uiWidgets.Toggle, {
				field: {
					id: "toggle-out",
					label: "Toggle Output",
					config: {
						selectionLayout: ["off", "icon", "on", "label"],
						selectionOnLabel: "On",
						selectionOffLabel: "Off",
						selectionOnInactive: "o-40",
						selectionOffInactive: "o-40",
						toggleOffIcn: "fas fa-toggle-on fa-flip-horizontal"
					}
				},
				value: toggleVal
			}))
		]),

		// Select/Radio
		m(".flex.mb2.items-center.ba.b--silver", [
			m(".flex.flex-column.w-50.pa2", [
				m(uiWidgets.SelectInput, {
					field: {
						id: "select-in",
						label: "Select Input",
						required: true,
						options: [{
							label: "Not Set",
							value: ""
						}, {
							label: "Yes",
							value: "yes"
						}, {
							label: "No",
							value: "no"
						}, {
							label: "Maybe",
							value: "maybe"
						}],
						uiClass: { wrapper: "mb2" }
					},
					value: optVal
				}),
				m(uiWidgets.RadioInput, {
					field: {
						id: "radio-in",
						label: "Yes",
						type: "radio",
						name: "radio-group-1",
						value: "yes",
						required: true
					},
					value: optVal
				}),
				m(uiWidgets.RadioInput, {
					field: {
						id: "radio-in2",
						label: "No",
						type: "radio",
						name: "radio-group-1",
						value: "no",
						required: true
					},
					value: optVal
				}),
				m(uiWidgets.RadioInput, {
					field: {
						id: "radio-in3",
						label: "Maybe",
						type: "radio",
						name: "radio-group-1",
						value: "maybe",
						required: true,
						config: {
							selectionLayout: ["icon", "label", "on"],
							selectionOnActive: "fas fa-question"
						}
					},
					value: optVal
				})
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
		m(".flex.mb2.ba.b--silver.flex-wrap", [
			m(".w-50.pa2", m(uiWidgets.CurrencyInput, {
				field: {
					id: "currency-in-currency",
					label: {
						text: "Currency Input",
						alt: "(Symbol on Right)"
					},
					config: { badgePosition: "right" }
				},
				value: currencyVal
			})),
			m(".w-50.pa2", m(uiWidgets.CurrencyInput, {
				field: {
					id: "currency-in-currency-parentheses",
					label: {
						text: "Currency Input",
						alt: "(Red negative)"
					},
					config: { negativeStyle: "red" }
				},
				value: currencyVal
			})),
			m(".w-50.pa2", m(uiWidgets.CurrencyInput, {
				field: {
					id: "currency-in-currency-parentheses",
					label: {
						text: "Currency Input",
						alt: "(Parentheses negative)"
					},
					config: { negativeStyle: "parentheses" }
				},
				value: currencyVal
			})),
			m(".w-50.pa2", m(uiWidgets.CurrencyInput, {
				field: {
					id: "currency-in-currency-red-parentheses",
					label: {
						text: "Currency Input",
						alt: "(Red Parentheses negative)"
					},
					config: { negativeStyle: "redParentheses" }
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


		// Percentage
		m(".flex.mb2.ba.b--silver.flex-wrap", [
			m(".w-50.pa2", m(uiWidgets.PercentageInput, {
				field: {
					id: "percentage",
					label: {
						text: "Percentage Input",
						alt: "(Symbol on right)"
					},
					max: 100,
					config: { badgePosition: "right" }
				},
				value: percentageVal
			})),
		]),

		m("p.mt1.f6.orange", "Note: Values beyond Number.MAX_SAFE_INTEGER have undefined behaviour and display/input values will have their absolute value taken"),
		m("p.mt1.f6.orange", "Note: Take care with CSS specificity between input class and red negative class"),

		// Card Date
		m(".flex.mb2.ba.b--silver", [
			m(".w-50.pa2", m(uiWidgets.CardDateInput, {
				field: {
					id: "card-in-date",
					label: "Card Expiry MM/YY",
					required: true
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
				icon: "fas fa-arrow-circle-down mr1",
				rightIcon: "fas fa-arrow-circle-down ml1",
				classes: "ma1",
				onclick: () => console.debug("Button Click")
			}),
			m(uiWidgets.Button, {
				label: "Disabled Button",
				classes: "ma1",
				disabled: true
				// onclick event will not fire on a disabled button
			}),
			m(uiWidgets.ButtonLink, {
				label: "Link Button",
				icon: "fas fa-link mr1",
				classes: "ma1",
				href: "#button"
			}),
			m(uiWidgets.NavButton, {
				label: "Nav Button",
				icon: "fas fa-arrow-circle-up mr1",
				classes: "ma1",
				onclick: () => console.debug("Nav Button Click")
			}),
			m(uiWidgets.NavLink, {
				label: "Nav Link",
				rightIcon: "fas fa-link ml1",
				classes: "ma1",
				href: "#button"
			})
		]),

		m("p", "Additional button themes can also be registered"),

		m(".flex.flex-wrap.mb1.nl1.nt1.nr1", [
			m(uiWidgets.Button, {
				label: "Inverted",
				rightIcon: "fas fa-recycle ml1",
				context: "invert",
				classes: "ma1"
			}),
			m(uiWidgets.Button, {
				label: "Warning",
				icon: "fas fa-exclamation-triangle mr1",
				context: "warn",
				classes: "ma1"
			}),
			m(uiWidgets.ButtonLink, {
				label: "Link Inverted",
				icon: "fas fa-link mr1",
				classes: "ma1",
				context: "invert",
				href: "#button"
			}),
		]),

		m("h3", m("a#custom.link[href=#custom]", "Customise")),
		m("p", "Widget options are simple to update"),

		// Custom BaseInput
		m(".flex.mb2.items-center.ba.b--silver", [
			m(".flex.flex-column.w-50.pa2", [
				m(uiWidgets.BaseInput, {
					field: {
						id: "custom-label",
						label: "Label",
						instant: true,
						uiClass: { wrapper: "mb2" }
					},
					value: label
				}),
				m(uiWidgets.SelectInput, {
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
						}],
						uiClass: { wrapper: "mb2" }
					},
					value: type
				}),
				m(uiWidgets.BaseInput, {
					field: {
						id: "custom-placeholder",
						label: "Placeholder",
						instant: true,
						uiClass: { wrapper: "mb2" }
					},
					value: placeholder
				}),
				,
				m(uiWidgets.CheckboxInput, {
					field: {
						id: "custom-required",
						label: "Required",
						uiClass: { wrapper: "mb2" }
					},
					value: required
				}),
				m(uiWidgets.CheckboxInput, {
					field: {
						id: "custom-readonly",
						label: "Readonly",
						uiClass: { wrapper: "mb2" }
					},
					value: readonly
				}),
				m(uiWidgets.CheckboxInput, {
					field: {
						id: "custom-disabled",
						label: "Disabled"
					},
					value: disabled
				})
			]),
			m(".w-50.pa2", m(uiWidgets.BaseInput, {
				field: {
					id: "custom-out",
					label: label(),
					type: type(),
					placeholder: placeholder(),
					required: required(),
					readonly: readonly(),
					disabled: disabled()
				},
				value: value
			}))
		]),

		m("h3", m("a#files.link[href=#files]", "File Support")),
		m("p", "These file widgets operate on a single file array stream"),

		// Disable file inputs
		m("h5", m(uiWidgets.CheckboxInput, {
			field: {
				label: "Disable File Inputs",
				id: "readonly-or-disabled",
			},
			value: readonlyOrDisabled
		})),

		// FileSelect/FileList
		m(".flex.mb2.ba.b--silver", [
			m(".w-50.pa2", m(uiWidgets.FileButtonSelect, {
				field: {
					id: "file-button-in",
					label: "File Button Input",
					uiClass: {
						inputWrapper: "dib"
					},
					readonly: readonlyOrDisabled()
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
					label: "File Input",
					readonly: readonlyOrDisabled()
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
			onclick: () => console.debug(fileList())
		}),

		m("p", "The OmniFileInput widget behaves like a file or image input based on the type of file set"),

		m(".flex.mb2.ba.b--silver", [
			m(".w-50.pa2", m(uiWidgets.OmniFileInput, {
				field: {
					id: "omni-file-in",
					label: "Omni File Input",
					readonly: readonlyOrDisabled()
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
					label: "Multiple Omni File Input",
					config: {
						uploadIcn: "fas fa-file-import",
						addFileTxt: "Custom Upload Text"
					},
					readonly: readonlyOrDisabled()
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
					label: "Image Select Input",
					readonly: readonlyOrDisabled()
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
			onclick: () => console.debug(imgInputList())
		}),

		// ImageMulti/ImageList
		m(".flex.mb2.ba.b--silver", [
			m(".w-50.pa2", m(uiWidgets.ImageMulti, {
				field: {
					id: "image-multi-in",
					label: "Image List Input",
					config: {
						imageIcn: "fas fa-images"
					},
					readonly: readonlyOrDisabled()
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
				onclick: () => console.debug(imgList())
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
			onclick: () => console.debug(signList())
		}),

		m("h3", m("a#theme.link[href=#theme]", "Theme Support")),
		m("p", "Update theme classes on the fly and use your existing css"),
		m("p", "Try other available classes from ",
			m("a[href=https://tachyons.io/][target=_blank]", "Tachyons css")
		),

		m(".flex.flex-wrap.mb2", [

			// Buttons
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
			})),
			// Inputs
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
			})),
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
			})),
			// Required/disabled
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
		m("p", "We hope you like these widgets and we value your feedback"),

		// Feedback
		m(".flex", [
			m(uiWidgets.RadioInput, {
				field: {
					id: "feedback-1",
					value: "1",
					uiClass: faceValUiClass,
					config: {
						radioOnIcn: "fas fa-angry fa-2x fa-spin",
						radioOffIcn: "fas fa-angry fa-2x o-40"
					}
				},
				value: faceVal
			}),
			m(uiWidgets.RadioInput, {
				field: {
					id: "feedback-2",
					value: "2",
					uiClass: faceValUiClass,
					config: {
						radioOnIcn: "fas fa-frown fa-2x fa-spin",
						radioOffIcn: "fas fa-frown fa-2x o-40"
					}
				},
				value: faceVal
			}),
			m(uiWidgets.RadioInput, {
				field: {
					id: "feedback-3",
					value: "3",
					uiClass: faceValUiClass,
					config: {
						radioOnIcn: "fas fa-meh fa-2x fa-spin",
						radioOffIcn: "fas fa-meh fa-2x o-40"
					}
				},
				value: faceVal
			}),
			m(uiWidgets.RadioInput, {
				field: {
					id: "feedback-4",
					value: "4",
					uiClass: faceValUiClass,
					config: {
						radioOnIcn: "fas fa-smile fa-2x fa-spin",
						radioOffIcn: "fas fa-smile fa-2x o-40"
					}
				},
				value: faceVal
			}),
			m(uiWidgets.RadioInput, {
				field: {
					id: "feedback-5",
					value: "5",
					uiClass: faceValUiClass,
					config: {
						radioOnIcn: "fas fa-grin-beam fa-2x fa-spin",
						radioOffIcn: "fas fa-grin-beam fa-2x o-40"
					}
				},
				value: faceVal
			})
		]),

		faceVal() ? m("p", Number.parseInt(faceVal()) < 4
			? [
				"Missing features? Room for improvement? Be sure to ",
				m("a.link[href=https://github.com/sdxmessaging/ui-widgets/issues][target=_blank]", "log an issue.")
			]
			: "We'll keep up the good work!"
		) : null

	])
});
