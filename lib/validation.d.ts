import { IField, IFile, TProp } from "./interface/widget";
export declare function propInvalid(field: IField, value: TProp): boolean;
export declare function rangeInvalid(field: IField, value: TProp): boolean;
export declare function inputmodeInvalid(field: IField, value: TProp): boolean;
export declare function patternInvalid(pattern: string, value: string): boolean;
export declare function fileInvalid(field: IField, value: IFile[]): boolean;
