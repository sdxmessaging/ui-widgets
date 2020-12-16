import stream from "mithril/stream";
import { IClasses, TStyle } from "./theme";
export declare type TProp = string | number | boolean;
export declare type TPropStream = stream<string> | stream<number> | stream<boolean> | stream<TProp>;
export interface IFile {
    readonly guid: string;
    readonly name: string;
    readonly path: string;
    readonly file?: File;
    readonly dataUrl?: string;
}
export declare const enum FieldType {
    label = "label",
    trusted = "trusted",
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
export declare const enum SignTypes {
    Draw = "draw",
    Type = "type",
    Stamp = "stamp"
}
declare type TAutocomplete = "off" | "on" | "name" | "honorific-prefix" | "given-name" | "additional-name" | "family-name" | "honorific-suffix" | "nickname" | "username" | "new-password" | "current-password" | "one-time-code" | "organization-title" | "organization" | "street-address" | "address-line1" | "address-line2" | "address-line3" | "address-level4" | "address-level3" | "address-level2" | "address-level1" | "country" | "country-name" | "postal-code" | "cc-name" | "cc-given-name" | "cc-additional-name" | "cc-family-name" | "cc-number" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-csc" | "cc-type" | "transaction-currency" | "transaction-amount" | "language" | "bday" | "bday-day" | "bday-month" | "bday-year" | "sex" | "url" | "photo" | "tel" | "tel-country-code" | "tel-national" | "tel-area-code" | "tel-local" | "tel-extension" | "email" | "impp";
export interface IField {
    readonly label?: string;
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
    readonly accept?: string;
    readonly instant?: boolean;
    readonly uiClass?: IClasses;
    readonly classes?: string;
    readonly containerClass?: string;
    readonly style?: TStyle;
    readonly default?: string;
}
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
}
export declare type TField = IField | IOptionField | ISignField;
export interface IMithrilEvent extends Event {
    redraw: boolean;
}
interface IBaseWidget {
    readonly field: TField;
}
export interface IDisplayWidget {
    readonly value: stream<IFile[]>;
    readonly displayType: DisplayType;
}
export interface IFileWidget extends IBaseWidget {
    readonly value: stream<IFile[]>;
    readonly displayType?: DisplayType;
    readonly showDisplay?: stream<boolean>;
}
export interface IPropWidget extends IBaseWidget {
    readonly value: TPropStream;
    readonly xform?: TPropStream;
}
export declare const enum DisplayType {
    thumbnail = "thumbnail",
    list = "list"
}
export interface ISignWidget {
    readonly heightPct: number;
    readonly style: TStyle;
    onSet(dataUrl: string): void;
    onCancel(): void;
}
export {};
