import { Stream } from "mithril/stream";
export declare type TProp = string | number | boolean;
export interface IFile {
    readonly guid: string;
    readonly name: string;
    readonly path: string;
    readonly file?: File;
    readonly dataUrl?: string;
}
export declare const enum FieldType {
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
declare type TAutocomplete = "off" | "on" | "name" | "honorific-prefix" | "given-name" | "additional-name" | "family-name" | "honorific-suffix" | "nickname" | "username" | "new-password" | "current-password" | "one-time-code" | "organization-title" | "organization" | "street-address" | "address-line1" | "address-line2" | "address-line3" | "address-level4" | "address-level3" | "address-level2" | "address-level1" | "country" | "country-name" | "postal-code" | "cc-name" | "cc-given-name" | "cc-additional-name" | "cc-family-name" | "cc-number" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-csc" | "cc-type" | "transaction-currency" | "transaction-amount" | "language" | "bday" | "bday-day" | "bday-month" | "bday-year" | "sex" | "url" | "photo" | "tel" | "tel-country-code" | "tel-national" | "tel-area-code" | "tel-local" | "tel-extension" | "email" | "impp";
export interface IModelField {
    readonly label: string;
    readonly id: string;
    readonly type: FieldType | string;
    readonly name?: string;
    readonly placeholder?: string;
    readonly required?: boolean;
    readonly readonly?: boolean;
    readonly disabled?: boolean;
    readonly autofocus?: boolean;
    readonly autocomplete?: TAutocomplete;
    readonly spellcheck?: boolean;
    readonly instant?: boolean;
    readonly classes?: string;
    readonly containerClass?: string;
    readonly style?: Record<string, string>;
    readonly default?: string;
}
export interface IOption {
    readonly label: string;
    readonly value: TProp;
}
export interface IOptionField extends IModelField {
    readonly type: FieldType.select | FieldType.radio;
    readonly options: IOption[];
}
export declare type TField = IModelField | IOptionField;
export interface IMithrilEvent extends Event {
    redraw: boolean;
}
interface IBaseWidget {
    readonly field: TField;
}
export interface IFileWidget extends IBaseWidget {
    readonly value: Stream<IFile[]>;
}
export interface IPropWidget extends IBaseWidget {
    readonly value: Stream<TProp>;
}
export interface ISignWidget {
    onSet(dataUrl: string): void;
    onCancel(): void;
}
export {};
