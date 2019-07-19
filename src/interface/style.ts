// Font Awesome icon style (excluding "fab" branding icons)
export type TIconStyle = "fas" | "far" | "fal";

export interface ITheme {
	readonly icon: TIconStyle;
	readonly inpHgt: string;
	readonly btnBg: string;
	readonly btnTxt: string;
}
