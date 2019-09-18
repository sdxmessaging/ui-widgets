import stream from "mithril/stream";
import { TThemeKey, TThemeUpdate } from "./interface/theme";
export declare const signAspectRatio: {
    "padding-bottom": string;
};
export declare const imgMaxSize: {
    "max-height": string;
};
export declare const lblCls: stream<string>;
export declare const txtCls: stream<string>;
export declare const areaCls: stream<string>;
export declare const inpCls: stream<string>;
export declare const btnClass: stream<string>;
export declare function updateTheme(newTheme: Partial<TThemeUpdate>): void;
export declare function getTheme(keys: ReadonlyArray<TThemeKey>): string;
export declare function getIcon(iconClass: string): string;
