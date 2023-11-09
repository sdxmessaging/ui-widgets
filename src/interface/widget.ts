import { Children } from "mithril";
import stream from "mithril/stream";

import { IConfig, TIcon } from "./config";
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
	percentage = "percentage",
	dateInput = "dateInput",
	cardDate = "cardDate",
	textarea = "textarea",
	checkbox = "checkbox",
	toggle = "toggle",
	select = "select",
	checkList = "checkList",
	radio = "radio",
	fileMulti = "fileMulti",
	file = "file",
	image = "image",
	imageMulti = "imageMulti",
	imageSelect = "imageSelect",
	sign = "sign"
}

type TFieldType = keyof typeof FieldType;

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

export const enum LayoutType {
	default = "default",
	floatLabel = "floatLabel",
	floatAlways = "floatAlways"
}

export interface IWidgetLabel {
	readonly text: string;
	readonly alt?: string;
	readonly icon?: TIcon;
	readonly rightIcon?: TIcon;
	readonly href?: string;
	onclick?(): void;
}

type TTabIndex = "-1" | "0" | -1 | 0;

export interface IField {
	readonly label?: string | IWidgetLabel;
	// Standard HTML input attributes
	readonly id: string;
	readonly type?: TFieldType;
	readonly name?: string;
	readonly title?: string;
	readonly placeholder?: string;
	readonly required?: boolean;
	readonly readonly?: boolean;
	readonly disabled?: boolean;
	readonly autofocus?: boolean;
	readonly autocomplete?: TAutocomplete;
	readonly tabindex?: "-1" | "0" | -1 | 0;
	readonly max?: number | string;
	readonly maxlength?: number;
	readonly min?: number | string;
	readonly minlength?: number;
	readonly step?: number | "any";
	readonly pattern?: string;
	readonly inputmode?: "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
	readonly spellcheck?: boolean;
	// Standard file input attribute
	readonly accept?: string;
	// Widget attributes
	readonly instant?: boolean;
	readonly layout?: LayoutType;
	readonly uiClass?: IWidgetClasses;
	readonly config?: Partial<IConfig>;
}

// Select options
export interface IOption {
	readonly value: TProp;
	readonly label?: string;
}

// We should ideally explicitly type these IField variants:
// extends Omit<IField, "type">
export interface IOptionField extends IField {
	readonly type?: "select" | "checkList" | "sign";
	readonly multiple?: boolean;
	readonly options?: IOption[];
}

export interface ISignField extends IOptionField {
	readonly type?: "sign";
	readonly heightPct?: number;
	readonly stampTxt?: string;
	readonly stampSetTxt?: string;
}

export interface ICheckboxField extends IField {
	readonly type?: "checkbox" | "toggle";
	readonly value?: TProp;
}

export interface IRadioField extends IField {
	readonly type?: "radio";
	readonly name: string;
	readonly value: TProp;
}

export interface ITextareaField extends IField {
	readonly type?: "textarea";
	readonly rows?: number;
	readonly cols?: number;
	readonly wrap?: "hard" | "soft" | "off";
}

export type TField = IField | IOptionField | ISignField | ICheckboxField | IRadioField | ITextareaField;

// Editor signature inner widgets
export interface ISignWidget {
	readonly heightPct: number;
	readonly stampTxt: string;
	readonly stampSetTxt: string;
	readonly style: TStyle;
	readonly config?: Partial<IConfig>;
	onSet(dataUrl: string, metadata?: TPropMap): void;
	onCancel(): void;
}

// Mithril event handler helper
export interface IMithrilEvent extends Event {
	redraw: boolean;
}

// View/Edit model field widgets
interface IBaseWidget<T> {
	readonly field: T;
}

export interface IDisplayWidget {
	readonly value: stream<IFile[]>;
	readonly displayType?: DisplayType;
	readonly readonlyOrDisabled?: boolean;
	readonly config?: Partial<IConfig>;
}

export interface IFileWidget<T = IField> extends IBaseWidget<T> {
	readonly value: stream<IFile[]>;
	readonly displayType?: DisplayType;
	readonly showDisplay?: boolean;
}

export interface IPropWidget<T = IField> extends IBaseWidget<T> {
	readonly value: TPropStream;
	readonly xform?: TPropStream;
	readonly children?: Children;
}

export interface IPropLayoutWidget<T = IField> extends IPropWidget<T> {
	readonly invalid: boolean;
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

// Button
interface IBaseButton {
	readonly label?: string;
	readonly title?: string;
	readonly icon?: TIcon;
	readonly rightIcon?: TIcon;
	readonly context?: string;
	readonly classes?: string;
	readonly style?: Partial<CSSStyleDeclaration>;
}

export interface IButton extends IBaseButton {
	readonly type?: "submit" | "reset" | "button";
	readonly tabindex?: TTabIndex;
	readonly disabled?: boolean;
	onclick?(evt: IMithrilEvent): void;
}

export interface IButtonLink extends IBaseButton {
	readonly href?: string;
	readonly rel?: string;
	readonly target?: "_self" | "_blank" | "_parent" | "_top";
	readonly download?: string;
}
export interface IToolTip {
	readonly message: ReadonlyArray<string>;
	readonly direction?: MessageDirection;
	readonly icon?: string;
}

export const enum MessageDirection {
	top = "top",
	topLeft = "topLeft",
	topRight = "topRight",
	bottom = "bottom",
	bottomLeft = "bottomLeft",
	bottomRight = "bottomRight",
	left = "left",
	right = "right"
}
