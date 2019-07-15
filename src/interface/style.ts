// Font Awesome icon style
export type TIconStyle = "fas" | "far" | "fal" | "fab";

// BSS TypeScript basic support
interface IBss {
	readonly class: string;
	// Expected classes
	readonly imgHeight: any;
	readonly aspectRatio4x1: any;
	readonly inputHeight: any;
	readonly bgBranding: any;
	// readonly branding: any;
	readonly brandingAlt: any;
}

export type TBss = {
	[key in keyof IBss]: TBss | any;
};
