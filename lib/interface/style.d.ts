export declare type TIconStyle = "fas" | "far" | "fal";
interface IBss {
    readonly class: string;
    readonly inputHeight: any;
    readonly bgBranding: any;
    readonly brandingAlt: any;
}
export declare type TBss = {
    [key in keyof IBss]: TBss | any;
};
export {};
