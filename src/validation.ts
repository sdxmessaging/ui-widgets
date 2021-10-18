import { IField, IFile, TProp } from "./interface/widget";

// TODO Expand validation for field input masks, min/max, minlength/maxlength etc

export function propInvalid(field: IField, value: TProp): boolean {
	if (field.required) {
		if (!value) return true;
	}
	if (typeof value === "number" && typeof field.max === "number" && typeof field.min === "number"){
		return rangeInvalid(field.min, field.max, value);
		//TODO: check why max and min can be strings and change as needed
	}
	return false;
}

export function rangeInvalid(min: number, max: number, value: number): boolean {
	return value > max || value < min;
}

export function fileInvalid(field: IField, value: IFile[]): boolean {
	if (field.required) {
		return value.length < 1;
	}
	return false;
}
