import m from "mithril";
import { Stream } from "mithril/stream";
import { ITheme } from "./interface/style";
import { IModelField, TProp } from "./interface/widget";
export declare const pxRatio: number;
export declare const inputBorder: string;
export declare const inputText: string;
export declare const labelCls: string;
export declare const signAspectRatio: {
    "padding-bottom": string;
};
export declare function applyTheme(newTheme: Partial<ITheme>): void;
export declare function getTheme(keys: Array<keyof ITheme>): string;
export declare function getIcon(iconClass: string): string;
export declare function getDisplayLabel({ label }: IModelField, className?: string): m.Vnode<any, any>;
export declare function getLabel({ id, label, required }: IModelField): m.Vnode<any, any>;
export declare function getLabelText(label: string, required?: boolean): string;
export declare function imgSrc(path: string, dataUrl?: string): string;
export declare function guid(): string;
export declare function setValue(val: Stream<TProp>): ({ target: { value } }: {
    target: HTMLInputElement;
}) => Stream<TProp>;
export declare function setCheck(chk: Stream<TProp>): ({ target: { checked } }: {
    target: HTMLInputElement;
}) => Stream<TProp>;
export declare function pickByProperty<T>(list: ReadonlyArray<T>, prop: Partial<T>): T | undefined;
/**
 * Mutates input list, returns array of removed items
 */
export declare function removeByProperty<T>(list: T[], prop: Partial<T>): T[];
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
export declare function resizeImage(file: File, maxSize: number, type: string): Promise<string>;
