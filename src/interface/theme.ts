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
	readonly dspBrd: stream<string>;
	// Input
	readonly inpHgt: stream<string>;
	readonly inpCol: stream<string>;
	readonly inpFnt: stream<string>;
	readonly inpBrd: stream<string>;
	// Active (radio/checkbox)
	readonly actCol: stream<string>;
	readonly actBg: stream<string>;
	// File input
	readonly filBrd: stream<string>;
	readonly filBrdCol: stream<string>;
	readonly drgCol: stream<string>;
	readonly drgBrdCol: stream<string>;
	// Button
	readonly btnBg: stream<string>;
	readonly btnCol: stream<string>;
	readonly btnFnt: stream<string>;
	readonly btnPad: stream<string>;
	readonly btnBrd: stream<string>;
}

export type TThemeKey = keyof ITheme;

export type TThemeUpdate = {
	[prop in TThemeKey]: string;
}
