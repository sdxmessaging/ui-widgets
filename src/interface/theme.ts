// Font Awesome icon style (excluding "fab" branding icons)
export type TIconClass = "fas" | "far" | "fal" | "fad";

export interface ITheme {
	readonly icon: TIconClass;
	readonly inpHgt: string;
	readonly btnBg: string;
	readonly btnTxt: string;
}
