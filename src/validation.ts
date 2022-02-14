import { IField, IFile, TProp } from "./interface/widget";

// TODO Expand validation for field input masks, min/max, minlength/maxlength etc

export function propInvalid(field: IField, value: TProp): boolean {
	if ((!field.required && !value) || field.disabled) {
		return false;
	}
	if (field.required && !value) {
		return true;
	}

	if (field.pattern != null) {
		if (patternInvalid(field.pattern, String(value))) return true;
	}

	if (rangeInvalid(field, value)) return true;

	return false;
}

export function rangeInvalid(field: IField, value: TProp) {
	let overMax = false;
	let underMin = false;

	if (field.min != null) {
		underMin = Number.parseInt(String(value)) < field.min;
	}
	if (field.max != null) {
		overMax = Number.parseInt(String(value)) > field.max;
	}
	if (field.minlength != null) {
		underMin = String(value).length < field.minlength;
	}
	if (field.maxlength != null) {
		overMax = String(value).length > field.maxlength;
	}

	return underMin || overMax;
}

export function inputmodeInvalid(field: IField, value: TProp): boolean {
	switch (field.inputmode) {
		case "numeric": {
			const matches = String(value).match(/^(-?)\d+((\.|,)(\d+))?/);
			return matches ? !matches.includes(String(value)) : true;
		}
		case "decimal": {
			const matches = String(value).match(/^(-?)(\d+)((\.|,){1})(\d+)/);
			return matches ? !matches.includes(String(value)) : true;
		}
	}
	return false;

}

export function patternInvalid(pattern: string, value: string): boolean {
	return !(new RegExp(pattern)).test(value);
}

export function fileInvalid(field: IField, value: IFile[]): boolean {
	if (field.required) {
		return value.length < 1;
	}
	return false;
}
