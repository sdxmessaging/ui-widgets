import { IField, IFile, TProp } from "./interface/widget";
export declare function propInvalid(field: IField, value: TProp): boolean;
export declare function rangeInvalid(min: number, max: number, value: number): boolean;
export declare function lengthInvalid(minlength: number, maxlength: number, value: string): boolean;
export declare function fileInvalid(field: IField, value: IFile[]): boolean;
