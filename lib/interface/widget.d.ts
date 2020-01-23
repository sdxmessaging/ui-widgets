import stream from "mithril/stream";
export declare type TProp = string | number | boolean;
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
    text = "text",
    search = "search",
    date = "date",
    number = "number",
    range = "range",
    email = "email",
    url = "url",
    tel = "tel",
    color = "color",
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
export declare const enum SignTypes {
    Draw = "draw",
    Type = "type",
    Stamp = "stamp"
}
declare type TAutocomplete = "off" | "on" | "name" | "honorific-prefix" | "given-name" | "additional-name" | "family-name" | "honorific-suffix" | "nickname" | "username" | "new-password" | "current-password" | "one-time-code" | "organization-title" | "organization" | "street-address" | "address-line1" | "address-line2" | "address-line3" | "address-level4" | "address-level3" | "address-level2" | "address-level1" | "country" | "country-name" | "postal-code" | "cc-name" | "cc-given-name" | "cc-additional-name" | "cc-family-name" | "cc-number" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-csc" | "cc-type" | "transaction-currency" | "transaction-amount" | "language" | "bday" | "bday-day" | "bday-month" | "bday-year" | "sex" | "url" | "photo" | "tel" | "tel-country-code" | "tel-national" | "tel-area-code" | "tel-local" | "tel-extension" | "email" | "impp";
export interface IField {
    readonly label: string;
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
    readonly instant?: boolean;
    readonly classes?: string;
    readonly containerClass?: string;
    readonly style?: Record<string, string>;
    readonly default?: string;
}
export interface IOption {
    readonly value: TProp;
    readonly label: string;
    readonly icon?: string;
}
export interface IOptionField extends IField {
    readonly type: FieldType.select | FieldType.radio;
    readonly options: IOption[];
}
export declare type TField = IField | IOptionField;
export interface IMithrilEvent extends Event {
    redraw: boolean;
}
interface IBaseWidget {
    readonly field: TField;
}
export interface IFileWidget extends IBaseWidget {
    readonly value: stream<IFile[]>;
}
export interface IPropWidget extends IBaseWidget {
    readonly value: stream<TProp>;
}
export interface ISignWidget {
    onSet(dataUrl: string): void;
    onCancel(): void;
}
export {};
