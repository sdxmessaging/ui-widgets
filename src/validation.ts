import lodash from "lodash";
import { IField, IFile, TProp } from "./interface/widget";

// TODO Expand validation for field input masks, min/max, minlength/maxlength etc

export function propInvalid(field: IField, value: TProp): boolean {
	if (field.required && !value) {
		return true;
	}
	if (typeof value === "number" && typeof field.max === "number" && typeof field.min === "number") {
		return !lodash.inRange(value, field.min, field.max);
		//TODO: check why max and min can be strings and change as needed
	}
	else if (typeof value === "string" && field.maxlength && field.minlength) {
		return !lodash.inRange(value.length, field.minlength, field.maxlength);
	}
	return false;
}

export function fileInvalid(field: IField, value: IFile[]): boolean {
	if (field.required) {
		return value.length < 1;
	}
	return false;
}
