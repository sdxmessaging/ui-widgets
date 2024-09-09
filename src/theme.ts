import lodash from "lodash";

import { IClasses, IClassMap, IWidgetClasses } from "./interface/theme";
import { IField } from "./interface/widget";

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
	requiredInputWrapper: "",
	readonlyInputWrapper: "",
	disabledWrapper: "o-40",
	disabledInputWrapper: "",
	invalidInputWrapper: "ba b--red",
	altLabel: "ml1 o-70",
	floatLabelPlaceholder: "",
	invalidCheckboxWrapper: "red",
	tooltipWrapper: "dib relative mh2",
	tooltipIconBackground: "bg-black h2 w2 relative br-100 ",
	tooltipIcon: "white f6",
	tooltipMessage: "white bg-black w5 f6 pa2 absolute br2 z-max",
	redNumber: "red fw2",
	checkListOptionsWrapper: "ba br2 b--silver pa2 dark-gray bg-canvas w-100 max-h-img overflow-y-auto shadow-4",
	checkListOption: "pa2 hover-bg-light-gray",
	checkListOptionLabel: "mh1",
	checkListOptionIcon: "mh1",
	checkListOptionSingleSelected: "bg-light-blue fw6",
	checkListOptionMultiSelected: "fw6",
	timeInputScrollerWrapper: "ba br2 b--silver pa2 dark-gray bg-canvas top-2 shadow-4",
	timeInputScrollerNumber: "pv1 mv2 w-100 mw-dd tc f6 fw6 bg-light-gray"
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

// Merge incoming uiClass with theme class
function mergeClasses(key: keyof IClasses, uiClass: IWidgetClasses = {}) {
	if (key in uiClass) {
		// Merge by default unless expliictly disabled
		return uiClass.merge === false ? [uiClass[key]] : [uiClass[key], theme[key]];
	} else {
		return [theme[key]];
	}
}

export function wrapperCls(uiClass: IWidgetClasses, disabled?: boolean) {
	return joinClasses([
		...mergeClasses("wrapper", uiClass),
		disabled ? theme.disabledWrapper : ""
	]);
}

export function labelCls(uiClass?: IWidgetClasses, required?: boolean) {
	return joinClasses([
		...mergeClasses("label", uiClass),
		required ? theme.requiredLabel : ""
	]);
}

export function floatLabelPlaceholderCls({ required, uiClass }: IField, floatTop: boolean) {
	return joinClasses([
		labelCls(uiClass, required),
		floatTop ? "f-07em cursor-default" : `${theme.floatLabelPlaceholder} cursor-text`
	]);
}

export function inputWrapperCls({ required, readonly, disabled, uiClass }: IField, invalid?: boolean) {
	return joinClasses([
		...mergeClasses("inputWrapper", uiClass),
		...(invalid ? mergeClasses("invalidInputWrapper", uiClass) : []),
		required ? theme.requiredInputWrapper : null,
		readonly ? theme.readonlyInputWrapper : null,
		disabled ? theme.disabledInputWrapper : null
	]);
}

export function inputCls(uiClass?: IWidgetClasses) {
	return joinClasses(mergeClasses("input", uiClass));
}

export function checkInputCls({ readonly, disabled, uiClass }: IField) {
	return joinClasses([
		inputCls(uiClass),
		pointerCls(disabled, readonly)
	]);
}

export function textareaCls({ input, merge = true }: IWidgetClasses) {
	return joinClasses([
		input, merge ? theme.textarea : null
	]);
}

export function fileHoverCls(dragging: boolean) {
	return dragging ? theme.fileHover : "";
}

export function fileInputWrapperCls({ inputWrapper, merge = true }: IWidgetClasses, dragging: boolean, invalid: boolean) {
	return joinClasses([
		inputWrapper,
		merge ? theme.fileInputWrapper : null,
		invalid ? theme.invalidInputWrapper : null,
		fileHoverCls(dragging)
	]);
}

export function pointerCls(disabled?: boolean, readonly?: boolean) {
	return disabled || readonly ? "" : "pointer";
}
