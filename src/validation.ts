import { IField, IFile } from "./interface/widget";

export function fileInvalid(field: IField, value: IFile[]): boolean {
	if (field.required) {
		return value.length < 1;
	}
	return false;
}
