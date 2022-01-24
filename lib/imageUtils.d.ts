export declare const enum img {
    unknown = 65280,
    jpeg = 65496,
    tiff = 18761,
    app1 = 65505,
    exif = 1165519206,
    orientation = 274
}
export declare function getOrientation(buffer: ArrayBuffer): number;
export declare function readArrayBuffer(file: File): Promise<ArrayBuffer>;
export declare function readOrientation(file: File): Promise<number>;
export declare function rotateContext(ctx: CanvasRenderingContext2D, width: number, height: number, orientation?: number): void;
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
export declare function scaleDataUrl(dataUrl: string, maxSize: number): Promise<string>;
export declare function textToImage(text: string, width: number, height: number, font: string): string;
export declare function createStamp(sign: string, heightPct: number): string;
