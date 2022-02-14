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

// +4px for input native horizontal padding
export const enum DateWidth {
	dd = "calc(2.3ch + 4px)",
	mm = "calc(2.8ch + 4px)",
	yy = "calc(2.7ch + 4px)",
	yyyy = "calc(4.2ch + 4px)"
}

// ui-widgets 1.4 theme map
const classMapState: Required<IClassMap> = {
	wrapper: "",
	label: "silver",
	inputWrapper: "ba br2 b--silver pa2 ma0 dark-gray",
	input: "dark-gray fw2",
	button: "pa2 bn br2",
	navButton: "dark-gray",
	textarea: "dark-gray fw2",
	radio: "dark-gray pa2 br2",
	radioChecked: "bg-light-blue",
	radioUnchecked: "o-60",
	fileInputWrapper: "ba bw1 br3 b--black-30 b--dashed dark-gray",
	fileHover: "blue b--blue",
	displayLabel: "silver",
	displayValue: "dark-gray",
	requiredLabel: "",
	disabledWrapper: "o-40",
	invalidInputWrapper: "ba b--red",
	altLabel: "alt-label",
	floatLabelPlaceholder: ""
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

export function floatLabelPlaceholderCls(uiClass: IWidgetClasses, floatTop: boolean, required?: boolean) {
	return `${labelCls(uiClass, required)} ${floatTop ? "f-07em cursor-default" : `${theme.floatLabelPlaceholder} cursor-text`}`;
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

export function fileHoverCls(dragging: boolean) {
	return `${dragging ? theme.fileHover : ""}`;
}

export function fileInputWrapperCls({ inputWrapper = "", merge = true }: IWidgetClasses, dragging: boolean, invalid: boolean) {
	return `${inputWrapper} ${merge ? theme.fileInputWrapper : ""} ${invalid ? theme.invalidInputWrapper : ""} ${fileHoverCls(dragging)}`;
}

export function pointerCls(disabled?: boolean, readonly?: boolean) {
	return disabled || readonly ? "" : "pointer";
}
