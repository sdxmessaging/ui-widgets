import { Stream } from "mithril/stream";

export type TPropVal = string | number | boolean;

export interface IDataFile {
	// For persisting, to be sent with item data
	readonly _id: string;
	readonly prop: string;
	// Link for files outside of local vault
	readonly remoteUrl?: string;
	// Standard file metadata
	readonly name: string;
	readonly size: number;
	readonly type: string;
	readonly lastModified: number;
	// To be uploaded separate from item data
	readonly file?: Blob;
	readonly dataUrl?: string;
}

export const enum FieldType {
	text = "text",
	label = "label",
	date = "date",
	number = "number",
	email = "email",
	tel = "tel",
	textarea = "textarea",
	trusted = "trusted",
	checkbox = "checkbox",
	select = "select",
	radio = "radio",
	fileMulti = "fileMulti",
	file = "file",
	image = "image",
	imageMulti = "imageMulti",
	sign = "sign"
}

export interface IModelField {
	readonly prop: string;
	readonly label: string;
	readonly type: FieldType | string;
	readonly default?: string;
	readonly placeholder?: string;
	readonly classes?: string;
	readonly containerClass?: string;
	readonly required?: boolean;
	readonly disabled?: boolean;
	readonly style?: Record<string, string>;
}

// Select/Radio widgets
export interface IOption {
	readonly label: string;
	readonly value: TPropVal;
}

export interface IOptionField extends IModelField {
	readonly type: FieldType.select | FieldType.radio;
	readonly options: IOption[];
}

export type TField = IModelField | IOptionField;

// Mithril event handler helper
export interface IMithrilEvent extends Event {
	redraw: boolean;
}

// View/Edit model field widgets
interface IBaseWidget {
	readonly field: TField;
}
export interface IFileWidget extends IBaseWidget {
	readonly value: Stream<IDataFile[]>;
}
export interface IPropWidget extends IBaseWidget {
	readonly value: Stream<TPropVal>;
}

// Editor signature inner widgets
export interface ISignWidget {
	onSet(dataUrl: string): void;
	onCancel(): void;
}
