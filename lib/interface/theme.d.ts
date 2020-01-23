import stream from "mithril/stream";
export interface ITheme {
    readonly icon: stream<string>;
    readonly lblCol: stream<string>;
    readonly lblFnt: stream<string>;
    readonly dspFnt: stream<string>;
    readonly dspBrd: stream<string>;
    readonly inpHgt: stream<string>;
    readonly inpCol: stream<string>;
    readonly inpFnt: stream<string>;
    readonly inpBrd: stream<string>;
    readonly actCol: stream<string>;
    readonly actBg: stream<string>;
    readonly filBrd: stream<string>;
    readonly filBrdCol: stream<string>;
    readonly drgCol: stream<string>;
    readonly drgBrdCol: stream<string>;
    readonly btnBg: stream<string>;
    readonly btnCol: stream<string>;
    readonly btnFnt: stream<string>;
    readonly btnBrd: stream<string>;
}
export declare type TThemeKey = keyof ITheme;
export declare type TThemeUpdate = {
    [prop in TThemeKey]: string;
};
