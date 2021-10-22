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
	if (typeof value === "string"){
		if (field.maxlength && field.minlength){
			return !lodash.inRange(value.length, field.minlength, field.maxlength);
		} 
		if (field.pattern) {
			return patternInvalid(field.pattern, value);
		}
	}
	return false;
}

export function inputmodeInvalid(field : IField, value : TProp) : boolean {
	switch(field.inputmode){
		case "numeric":
			return /-?[0-9]*/.test(String(value));
		case "tel":
			break;
		case "decimal":
			return /-?[0-9]*(.|,)[0-9]*/.test(String(value));
		case "email":
			break;
		case "url":
			break;
	}
	return false;

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
