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
export interface IModelField {
    readonly id: string;
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
