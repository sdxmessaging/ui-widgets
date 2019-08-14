import m from "mithril";
import stream from "mithril/stream";
import { ITheme } from "./interface/style";
import { TField, TProp } from "./interface/widget";
export declare const inputBorder: string;
export declare const inputText: string;
export declare const labelCls: string;
export declare const signAspectRatio: {
    "padding-bottom": string;
};
export declare const imgMaxSize: {
    "max-height": string;
};
export declare function applyTheme(newTheme: Partial<ITheme>): void;
export declare function getTheme(keys: Array<keyof ITheme>): string;
export declare function getIcon(iconClass: string): string;
export declare function getDisplayLabel({ label }: TField, className?: string): m.Vnode<any, any>;
export declare function getLabel({ id, label, required }: TField): m.Vnode<any, any>;
export declare function getLabelText(label: string, required?: boolean): string;
export declare function imgSrc(path: string, dataUrl?: string): string;
export declare function guid(): string;
export declare function setValue(val: stream<TProp>): ({ target: { value } }: {
    target: HTMLInputElement;
}) => stream<TProp>;
export declare function setCheck(chk: stream<TProp>): ({ target: { checked } }: {
    target: HTMLInputElement;
}) => stream<TProp>;
/**
 * Split given file name from extension
 */
export declare function fileNameExtSplit(fileName: string): [string, string];
export declare function dataURItoBlob(dataURI: string): Blob;
/**
 * Scale given width and height values if either exceed the giving limit
 * Returns integer values, rounding errors can significantly distort small rectangles
 */
export declare function scaleRect(width: number, height: number, limit: number): [number, number];
/**
 * Shrink an image if width/height exceeds a given maximum
 * @param file Image file to resize
 * @param maxSize Maximum dimension size in pixels
 * @param type Image MIME type to return
 */
export declare function resizeImage(file: File, maxSize: number, type?: string): Promise<string>;
export declare function readOrientation(file: File): Promise<number>;
export declare function getOrientation(buffer: ArrayBuffer): number;
export declare function rotateContext(ctx: CanvasRenderingContext2D, width: number, height: number, orientation?: number): void;
