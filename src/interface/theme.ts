import stream from "mithril/stream";

// Internal theme manager
export interface ITheme {
	// Icon
	readonly icon: stream<string>;
	// Label
	readonly lblCol: stream<string>;
	readonly lblFnt: stream<string>;
	// display
	readonly dspFnt: stream<string>;
	// TODO display border (bb b--black-20)
	// Input
	readonly inpHgt: stream<string>;
	readonly inpCol: stream<string>;
	readonly inpFnt: stream<string>;
	readonly inpBrd: stream<string>;
	// TODO File input border
	// Button
	readonly btnBg: stream<string>;
	readonly btnCol: stream<string>;
	readonly btnFnt: stream<string>;
	readonly btnBrd: stream<string>;
	// TODO Hover border/font classes
}

export type TThemeKey = keyof ITheme;

export type TThemeUpdate = {
	[prop in TThemeKey]: string;
}
