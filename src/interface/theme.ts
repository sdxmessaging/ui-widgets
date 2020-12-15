import stream from "mithril/stream";

export type TStyle = Partial<CSSStyleDeclaration> | Record<string, string>;

export interface IClasses {
	/* Widget outermost element */
	readonly wrapper?: string;
	/* Label */
	readonly label?: string;
	/* Input element if visible */
	readonly input?: string;
	/* Input element container (including "decorations" in more advanced widgets) */
	readonly inputWrapper?: string;
}

export interface IClassMap extends IClasses {
	/* Classes common to all buttons */
	readonly button?: string;
	/* Classes common to all nav buttons */
	readonly navButton?: string;
	/* Classes to be applied to the "Icon" in checkbox/toggle controls*/
	readonly checkbox?: string;
	/* Classes to add to a file inputWrapper when hovering a dragged file over it */
	readonly fileHover?: string;
}

// Internal theme manager
export interface ITheme {
	// Icon
	// TODO Retire in favour of full icon classes in config
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
	// TODO Consolidate into single button class
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
