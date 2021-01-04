import lodash from "lodash";

import { IClassMap } from "./interface/theme";
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
const classMapState: IClassMap = {
	wrapper: "pa0 bn",
	label: "f6 silver",
	inputWrapper: "dark-gray",
	input: "h2 dark-gray fw2",
	button: "pa2 bn br2",
	navButton: "dark-gray",
	textarea: "dark-gray fw2",
	radio: "dark-gray pa2 br2",
	radioChecked: "bg-light-blue",
	fileInput: "dark-gray ba bw1 br3 b--dashed b--black-30",
	fileHover: "blue b--blue",
	displayLabel: "silver",
	displayValue: "dark-gray"
};

export const theme: Readonly<IClassMap> = classMapState;

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
