import stream from "mithril/stream";

export type TProp = string | number | boolean;

export interface IFile {
	readonly guid: string;
	readonly name: string;
	// Display
	readonly path: string;
	// Input
	readonly file?: File;
	// Image input preview
	readonly dataUrl?: string;
}

export const enum FieldType {
	label = "label",
	trusted = "trusted",
	// BaseInput
	text = "text",
	search = "search",
	date = "date",
	number = "number",
	range = "range",
	email = "email",
	url = "url",
	tel = "tel",
	color = "color",
	// Custom
	textarea = "textarea",
	checkbox = "checkbox",
	select = "select",
	radio = "radio",
	fileMulti = "fileMulti",
	file = "file",
	image = "image",
	imageMulti = "imageMulti",
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
	readonly label: string;
	// Standard HTML attributes
	readonly id: string;
	readonly type: FieldType | string;
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
	// Widget attributes
	readonly instant?: boolean;
	readonly classes?: string;
	readonly containerClass?: string;
	readonly style?: Record<string, string>;
	// No support
	readonly default?: string;
}

// Select/Radio widgets
export interface IOption {
	readonly value: TProp;
	readonly label: string;
	readonly icon?: string;
}

export interface IOptionField extends IField {
	readonly type: FieldType.select | FieldType.radio;
	readonly options: IOption[];
}

export interface ISignField extends IField {
	readonly type: FieldType.sign;
	readonly options?: IOption[];
	readonly heightPct?: number;
}

export type TField = IField | IOptionField | ISignField;

// Mithril event handler helper
export interface IMithrilEvent extends Event {
	redraw: boolean;
}

// View/Edit model field widgets
interface IBaseWidget {
	readonly field: TField;
}
export interface IFileWidget extends IBaseWidget {
	readonly value: stream<IFile[]>;
}
export interface IPropWidget extends IBaseWidget {
	readonly value: stream<TProp>;
}

// Editor signature inner widgets
export interface ISignWidget {
	readonly heightPct: number;
	readonly style: Record<string, string>;
	onSet(dataUrl: string): void;
	onCancel(): void;
}
