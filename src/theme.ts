import lodash from "lodash";

import { IClassMap, IWidgetClasses } from "./interface/theme";

import { config } from "./config";

// Class/Theme helpers
export function imgMaxSize() {
	return { "max-height": config.imageDispHeight };
}
export function thumbMaxSize() {
	return { "max-height": config.thumbDispHeight };
}

export const styleSm = { "max-width": "5.4ex" };
export const styleLg = { "max-width": "9ex" };

// ui-widgets 1.4 theme map
const classMapState: Required<IClassMap> = {
	wrapper: "pa0 bn",
	label: "f6 silver",
	inputWrapper: "dark-gray",
	input: "h2 dark-gray fw2",
	button: "pa2 bn br2",
	navButton: "dark-gray",
	textarea: "dark-gray fw2",
	radio: "dark-gray pa2 br2",
	radioChecked: "bg-light-blue",
	radioUnchecked: "o-60",
	fileInput: "dark-gray ba bw1 br3 b--dashed b--black-30",
	fileHover: "blue b--blue",
	displayLabel: "silver",
	displayValue: "dark-gray",
	requiredLabel: "",
	disabledWrapper: "o-40",
	invalidInputWrapper: ""
};

export const theme: Readonly<typeof classMapState> = classMapState;

export function updateClasses(newConfig: Partial<IClassMap>) {
	lodash.assign(classMapState, newConfig);
}

// Button context helpers
const btnMap: Record<string, string> = {
	default: "bg-light-blue dark-gray"
};

export function updateButtonContext(newButtonContext: Record<string, string>) {
	lodash.assign(btnMap, newButtonContext);
}

export function getButtonContext(key = "default"): string {
	if (key && key in btnMap) {
		return btnMap[key];
	} else {
		return "";
	}
}

// Class string helpers
export function wrapperCls({ wrapper = "", merge = true }: IWidgetClasses, disabled?: boolean) {
	return `${wrapper} ${merge ? theme.wrapper : ""} ${disabled ? theme.disabledWrapper : ""}`;
}

export function labelCls({ label = "", merge = true }: IWidgetClasses, required?: boolean) {
	return `${label} ${merge ? theme.label : ""} ${required ? theme.requiredLabel : ""}`;
}

export function inputWrapperCls({ inputWrapper = "", merge = true }: IWidgetClasses, invalid?: boolean) {
	return `${inputWrapper} ${merge ? theme.inputWrapper : ""} ${invalid ? theme.invalidInputWrapper : ""}`;
}

export function inputCls({ input = "", merge = true }: IWidgetClasses) {
	return `${input} ${merge ? theme.input : ""}`;
}

export function checkInputCls(uiClass: IWidgetClasses, disabled?: boolean, readonly?: boolean) {
	return `${inputCls(uiClass)} ${pointerCls(disabled, readonly)}`;
}

export function textareaCls({ input = "", merge = true }: IWidgetClasses) {
	return `${input} ${merge ? theme.textarea : ""}`;
}

export function radioInputCls({ input = "", merge = true }: IWidgetClasses, checked: boolean, disabled?: boolean, readonly?: boolean) {
	return `${input} ${merge ? theme.radio : ""} ${checked ? theme.radioChecked : theme.radioUnchecked} ${pointerCls(disabled, readonly)}`;
}

export function fileInputCls(dragging: boolean) {
	return `${theme.fileInput} ${dragging ? theme.fileHover : ""}`;
}

export function pointerCls(disabled?: boolean, readonly?: boolean) {
	return disabled || readonly ? "" : "pointer";
}
