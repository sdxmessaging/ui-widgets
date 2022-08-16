import lodash from "lodash";

import { IClassMap, IWidgetClasses } from "./interface/theme";

// ui-widgets 1.4 theme map
const classMapState: Required<IClassMap> = {
	wrapper: "",
	label: "silver",
	inputWrapper: "ba br2 b--silver pa2 ma0 dark-gray",
	input: "dark-gray fw2",
	button: "pa2 bn br2",
	navButton: "dark-gray",
	textarea: "dark-gray fw2",
	fileInputWrapper: "ba bw1 br3 b--black-30 b--dashed dark-gray",
	fileHover: "blue b--blue",
	displayLabel: "silver",
	displayValue: "dark-gray",
	requiredLabel: "",
	disabledWrapper: "o-40",
	invalidInputWrapper: "ba b--red",
	altLabel: "ml1 o-70",
	floatLabelPlaceholder: "",
	invalidCheckboxWrapper: "red",
	toolTipWrapper: "db relative ma2",
	toolTipIconBackground: "bg-black h2 w2 relative br-100 ",
	toolTipIcon: "white f6",
	toolTipMessage: "white bg-black w4 f6 pa2 absolute br2 z-max",
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

export function joinClasses(list: ReadonlyArray<string | false | 0 | null | undefined>) {
	return lodash.compact(list).join(" ");
}

// Class string helpers
export function wrapperCls({ wrapper = "", merge = true }: IWidgetClasses, disabled?: boolean) {
	return joinClasses([
		wrapper,
		merge ? theme.wrapper : "",
		disabled ? theme.disabledWrapper : ""
	]);
}

export function labelCls({ label = "", merge = true }: IWidgetClasses, required?: boolean) {
	return joinClasses([
		label,
		merge ? theme.label : "",
		required ? theme.requiredLabel : ""
	]);
}

export function floatLabelPlaceholderCls(uiClass: IWidgetClasses, floatTop: boolean, required?: boolean) {
	return joinClasses([
		labelCls(uiClass, required),
		floatTop ? "f-07em cursor-default" : `${theme.floatLabelPlaceholder} cursor-text`
	]);
}

export function inputWrapperCls({ inputWrapper = "", invalidInputWrapper = "", merge = true }: IWidgetClasses, invalid?: boolean) {
	return joinClasses([
		inputWrapper,
		merge ? theme.inputWrapper : "",
		invalid ? invalidInputWrapper : "",
		invalid && merge ? theme.invalidInputWrapper : "",
	]);
}

export function inputCls({ input = "", merge = true }: IWidgetClasses) {
	return joinClasses([
		input, merge ? theme.input : ""
	]);
}

export function checkInputCls(uiClass: IWidgetClasses, disabled?: boolean, readonly?: boolean) {
	return joinClasses([
		inputCls(uiClass), pointerCls(disabled, readonly)
	]);
}

export function textareaCls({ input = "", merge = true }: IWidgetClasses) {
	return joinClasses([
		input, merge ? theme.textarea : ""
	]);
}

export function fileHoverCls(dragging: boolean) {
	return dragging ? theme.fileHover : "";
}

export function fileInputWrapperCls({ inputWrapper = "", merge = true }: IWidgetClasses, dragging: boolean, invalid: boolean) {
	return joinClasses([
		inputWrapper,
		merge ? theme.fileInputWrapper : "",
		invalid ? theme.invalidInputWrapper : "",
		fileHoverCls(dragging)
	]);
}

export function pointerCls(disabled?: boolean, readonly?: boolean) {
	return disabled || readonly ? "" : "pointer";
}
