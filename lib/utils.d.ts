import m from "mithril";
import { IFile, TPropMap, TPropStream } from "./interface/widget";
import { IWidgetClasses } from "./interface/theme";
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
export declare function dateInRange(type: TDateInputType, first: number, second: number): ReadonlyArray<boolean>;
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
