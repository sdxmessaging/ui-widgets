import m from "mithril";
import { IFile, TPropStream } from "./interface/widget";
import { IWidgetClasses } from "./interface/theme";
declare global {
    interface Window {
        msCrypto: Crypto;
    }
}
export declare function guid(): string;
export declare function pxRatio(): number;
export declare function getLabelText(label: string, required?: boolean): string;
export declare function imgSrc(path: string, dataUrl?: string): string;
export declare function getDisplayLabel(label?: string): m.Vnode<any, any> | null;
export declare function getLabel(id: string, uiClass: IWidgetClasses, label?: string, required?: boolean): m.Vnode<any, any> | null;
export declare function labelIcon(leftIcon?: string, label?: string, rightIcon?: string): (string | m.Vnode<any, any> | null | undefined)[];
export declare function setValue(val: TPropStream): ({ target: { value } }: {
    target: HTMLInputElement;
}) => string | number | boolean | import("mithril/stream")<string>;
export declare function setCheck(chk: TPropStream): ({ target: { checked } }: {
    target: HTMLInputElement;
}) => string | number | boolean | import("mithril/stream")<boolean>;
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
/**
 * Scale given width and height values if either exceed the giving limit
 * Returns integer values, rounding errors can significantly distort small rectangles
 */
export declare function scaleRect(width: number, height: number, limit: number): [number, number];
export declare function getOrientation(buffer: ArrayBuffer): number;
export declare function readArrayBuffer(file: File): Promise<ArrayBuffer>;
export declare function readOrientation(file: File): Promise<number>;
export declare function rotateContext(ctx: CanvasRenderingContext2D, width: number, height: number, orientation?: number): void;
/**
 * Shrink an image if width/height exceeds a given maximum
 * @param file Image file to resize
 * @param maxSize Maximum dimension size in pixels
 * @param type Image MIME type to return
 */
export declare function resizeImage(file: File, maxSize: number, type?: string): Promise<string>;
export declare function textToImage(text: string, width: number, height: number, font: string): string;
export declare function getFileTypeIcon(file: IFile): string;
export declare function isImage(fileType: string): boolean | "";
