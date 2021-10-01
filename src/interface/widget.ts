import stream from "mithril/stream";

import { IWidgetClasses, TStyle } from "./theme";

export type TProp = string | number | boolean;

export type TPropMap = Record<string, TProp>;

// TODO Consider dropping stream<TProp> in a future version
export type TPropStream = stream<string> | stream<number> | stream<boolean> | stream<TProp>;

export interface IFile {
	readonly guid: string;
	readonly name: string;
	// Display
	readonly path: string;
	// Input
	readonly file?: File;
	// Image input preview
	readonly dataUrl?: string;
	// Any other info
	readonly metadata?: TPropMap;
}

export const enum FieldType {
	label = "label",
	trusted = "trusted",
	// BaseInput
	hidden = "hidden",
	text = "text",
	password = "password",
	search = "search",
	date = "date",
	time = "time",
	dateTimeLocal = "datetime-local",
	number = "number",
	range = "range",
	email = "email",
	url = "url",
	tel = "tel",
	color = "color",
	// Dedicated widget
	currency = "currency",
	dateInput = "dateInput",
	cardDate = "cardDate",
	textarea = "textarea",
	checkbox = "checkbox",
	toggle = "toggle",
	select = "select",
	radio = "radio",
	fileMulti = "fileMulti",
	file = "file",
	image = "image",
	imageMulti = "imageMulti",
	imageSelect = "imageSelect",
	sign = "sign"
}

export const enum SignTypes {
	Draw = "draw",
	Type = "type",
	Stamp = "stamp"
}

// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
// Fields can include helpers "section-", "shipping", "bulling"
// Contact fields can also be combined with "home", "work", "mobile", "fax", "pager"
type TAutocomplete = "off" | "on" |
	// Name
	"name" | "honorific-prefix" | "given-name" | "additional-name" | "family-name" | "honorific-suffix" | "nickname" |
	// Authentication
	"username" | "new-password" | "current-password" | "one-time-code" |
	// Organisation
	"organization-title" | "organization" |
	// Address
	"street-address" | "address-line1" | "address-line2" | "address-line3" |
	"address-level4" | "address-level3" | "address-level2" | "address-level1" |
	"country" | "country-name" | "postal-code" |
	// Payment
	"cc-name" | "cc-given-name" | "cc-additional-name" | "cc-family-name" |
	"cc-number" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-csc" | "cc-type" |
	"transaction-currency" | "transaction-amount" |
	// Person
	"language" | "bday" | "bday-day" | "bday-month" | "bday-year" | "sex" | "url" | "photo" |
	// Contact
	"tel" | "tel-country-code" | "tel-national" | "tel-area-code" | "tel-local" | "tel-extension" | "email" | "impp";

export interface IField {
	readonly label?: string;
	// Standard HTML input attributes
	readonly id: string;
	readonly type?: FieldType | string;
	readonly name?: string;
	readonly title?: string;
	readonly placeholder?: string;
	readonly required?: boolean;
	readonly readonly?: boolean;
	readonly disabled?: boolean;
	readonly autofocus?: boolean;
	readonly autocomplete?: TAutocomplete;
	readonly max?: number | string;
	readonly maxlength?: number;
	readonly min?: number | string;
	readonly minlength?: number;
	readonly step?: number | string;
	readonly pattern?: string;
	readonly inputmode?: "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
	readonly spellcheck?: boolean;
	// Standard file input attribute
	readonly accept?: string;
	// Widget attributes
	readonly instant?: boolean;
	// TODO Phase out string classes and containerClass in favour of new IClasses
	readonly uiClass?: IWidgetClasses;
	readonly style?: TStyle;
	// Unsupported legacy field
	readonly default?: string;
}

// Select/Radio options, config for other fields
export interface IOption {
	readonly value: TProp;
	readonly label?: string;
	readonly icon?: string;
}

export interface IOptionField extends IField {
	readonly options?: IOption[];
}

export interface ISignField extends IOptionField {
	readonly heightPct?: number;
	readonly stampTxt?: string;
	readonly stampSetTxt?: string;
}

export type TField = IField | IOptionField | ISignField;

// Editor signature inner widgets
export interface ISignWidget {
	readonly heightPct: number;
	readonly stampTxt: string;
	readonly stampSetTxt: string;
	readonly style: TStyle;
	onSet(dataUrl: string, metadata?: TPropMap): void;
	onCancel(): void;
}

// Mithril event handler helper
export interface IMithrilEvent extends Event {
	redraw: boolean;
}

// View/Edit model field widgets
interface IBaseWidget {
	readonly field: TField;
}

export interface IDisplayWidget {
	readonly value: stream<IFile[]>;
	readonly displayType?: DisplayType;
}

export interface IFileWidget extends IBaseWidget {
	readonly value: stream<IFile[]>;
	readonly displayType?: DisplayType;
	readonly showDisplay?: boolean;
}

export interface IPropWidget extends IBaseWidget {
	readonly value: TPropStream;
	readonly xform?: TPropStream;
	readonly labelStyle?: "internal" | "external";
}

export interface IThumbnailArgs {
	title?: string;
	src?: string;
	data?: IFile;
	style?: Partial<CSSStyleDeclaration>;
}

export const enum DisplayType {
	none = "none",
	thumbnail = "thumbnail",
	list = "list"
}
