import stream from "mithril/stream";
import { ITheme, TThemeUpdate } from "./interface/theme";
export declare function signAspectRatio(): {
    "padding-bottom": string;
};
export declare function imgMaxSize(): {
    "max-height": string;
};
export declare function thumbMaxSize(): {
    "max-height": string;
};
export declare const classMap: ITheme;
export declare const dspLblCls: stream<string>;
export declare const lblCls: stream<string>;
export declare const txtCls: stream<string>;
export declare const areaCls: stream<string>;
export declare const inpCls: stream<string>;
export declare const actCls: stream<string>;
export declare const filCls: stream<string>;
export declare const drgCls: stream<string>;
export declare const btnClass: stream<string>;
export declare function updateTheme(newTheme: Partial<TThemeUpdate>): void;
export declare function getIcon(iconClass: string): string;
