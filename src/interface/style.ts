// Font Awesome icon style (excluding "fab" branding icons)
export type TIconStyle = "fas" | "far" | "fal";

// BSS TypeScript basic support
interface IBss {
	readonly class: string;
	// BaseInpyt, PasswordInput, SelectInput height
	readonly inputHeight: any;
	// Button background
	readonly bgBranding: any;
	// Button text
	readonly brandingAlt: any;
}

export type TBss = {
	[key in keyof IBss]: TBss | any;
};
