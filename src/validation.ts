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
	if (typeof value === "string"){
		if (field.maxlength && field.minlength){
			return lengthInvalid(field.minlength, field.maxlength, value);
		} 
		if (field.pattern) {
			return patternInvalid(field.pattern, value);
		}
	}
	return false;
}

export function rangeInvalid(min: number, max: number, value: number) : boolean {
	return value > max || value < min;
}

export function lengthInvalid(minlength : number, maxlength : number, value : string) : boolean {
	return value.length > maxlength || value.length < minlength;
}

export function patternInvalid(pattern : string, value : string) : boolean {
	return !(new RegExp(pattern)).test(value);
}

export function fileInvalid(field: IField, value: IFile[]): boolean {
	if (field.required) {
		return value.length < 1;
	}
	return false;
}
