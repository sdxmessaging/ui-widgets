import m from "mithril";
import stream from "mithril/stream";
import { IFile, IWidgetLabel, TProp, TPropMap, TPropStream } from "./interface/widget";
import { IWidgetClasses } from "./interface/theme";
export declare function guid(): string;
export declare function pxRatio(): number;
export declare function titleFromLabel(label?: string | IWidgetLabel): string | undefined;
export declare function getLabelText(label: string | IWidgetLabel, required?: boolean): string;
export declare function getAltLabel({ alt }: IWidgetLabel): m.Vnode<any, any> | null;
export declare function imgSrc(path: string, dataUrl?: string): string;
export declare function getDisplayLabel(label?: string | IWidgetLabel, labelCls?: string): m.Vnode<any, any> | null;
export declare function getLabel(id: string, uiClass: IWidgetClasses, label?: string | IWidgetLabel, required?: boolean): m.Vnode<any, any> | null;
export declare function labelIcon(label: IWidgetLabel): m.Children[];
export declare function setValue(val: TPropStream): ({ target: { value } }: {
    target: HTMLInputElement;
}) => void;
export declare function setCheck(val: TPropStream, checkValue?: TProp): ({ target: { checked } }: {
    target: HTMLInputElement;
}) => void;
export declare function setIfDifferent<T>(inStream: stream<T>, val: T): void;
export declare function selectTarget({ target }: {
    target: HTMLInputElement;
}): void;
export declare function clickOnEnter({ key }: KeyboardEvent): void;
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
