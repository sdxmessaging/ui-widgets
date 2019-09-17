import { ITheme } from "./interface/style";
export declare const inputBorder = "border-box bn";
export declare const inputText = "fw2 dark-gray";
export declare const labelCls = "mb1 f6 silver";
export declare const signAspectRatio: {
    "padding-bottom": string;
};
export declare const imgMaxSize: {
    "max-height": string;
};
export declare function applyTheme(newTheme: Partial<ITheme>): void;
export declare function getTheme(keys: Array<keyof ITheme>): string;
export declare function getIcon(iconClass: string): string;
