import m from "mithril";
import { IFile, TPropMap, TPropStream } from "./interface/widget";
import { IWidgetClasses } from "./interface/theme";
import stream from "mithril/stream";
export declare function guid(): string;
export declare function pxRatio(): number;
export declare function getLabelText(label: string, required?: boolean): string;
export declare function imgSrc(path: string, dataUrl?: string): string;
export declare function getDisplayLabel(label?: string): m.Vnode<any, any> | null;
export declare function getLabel(id: string, uiClass: IWidgetClasses, label?: string, required?: boolean): m.Vnode<any, any> | null;
export declare function labelIcon(leftIcon?: string, label?: string, rightIcon?: string): (string | m.Vnode<any, any> | null | undefined)[];
export declare function setValue(val: TPropStream): ({ target: { value } }: {
    target: HTMLInputElement;
}) => void;
export declare function setCheck(chk: TPropStream): ({ target: { checked } }: {
    target: HTMLInputElement;
}) => void;
export declare type TDateInputType = "dd" | "mm" | "yyyy" | "yy";
export declare type TDateType = 'day' | 'month' | 'year';
export declare function dateInputIds(type: TDateType): "dd" | "mm" | "yyyy";
export declare function focusLastInput(dom: Element, id: string, focusedId: TDateInputType | undefined): void;
export declare function updateDom(newDom: Element, currentDom: stream<Element>, validity: TPropStream): void;
export declare function handleRetreatOrLiteralAdvance(id: string, selfType: TDateInputType, streamValue: string, dom: Element, event: KeyboardEvent, literalKey: string, nextTargetType: TDateInputType | undefined, prevTargetTyype: TDateInputType | undefined): void;
export declare function resetInvalidValueStream(valid: boolean, date: string, year: string, month: string, day: string, valueStream: TPropStream): void;
export declare function appendZeroToDayMonth(valueStream: TPropStream): void;
export declare function validDateInputLengths(year: string, month: string, day: string): boolean;
export declare function validateDate(year: string, month: string, day: string, required: boolean): boolean;
export declare function validateCardDate(year: string, month: string, required: boolean): boolean;
export declare function handleDateChange(streamType: TPropStream, id: string, selfType: TDateInputType, dom: Element, targetType?: TDateInputType): void;
/**
 * Split given file name from extension
 */
export declare function fileNameExtSplit(fileName: string): [string, string];
export declare function dataURItoBlob(dataURI: string): Blob;
/**
 * Convert a Blob into a "File-like" object without using the File constructor
 * Mutates input blob
 */
export declare function fileConstructor(blob: Blob, fileName: string): File;
export declare function dataUrlToFile(dataUrl: string, name: string, metadata?: TPropMap): IFile;
export declare function getFileTypeIcon(file: IFile): string;
export declare function isImage(fileType: string): boolean | "";
