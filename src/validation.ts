import { IField, IFile, TProp } from "./interface/widget";

// TODO Expand validation for field input masks, min/max, minlength/maxlength etc.

export function propInvalid(field: IField, value: TProp): boolean {
	if (field.required) {
		return !value;
	}
	return false;
}

export function fileInvalid(field: IField, value: IFile[]): boolean {
	if (field.required) {
		return value.length < 1;
	}
	return false;
}
