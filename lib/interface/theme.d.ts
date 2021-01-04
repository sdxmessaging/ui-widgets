export declare type TStyle = Partial<CSSStyleDeclaration> | Record<string, string>;
export interface IClasses {
    readonly wrapper?: string;
    readonly label?: string;
    readonly input?: string;
    readonly inputWrapper?: string;
}
export interface IClassMap extends IClasses {
    readonly button?: string;
    readonly navButton?: string;
    readonly textarea?: string;
    readonly radio?: string;
    readonly radioChecked?: string;
    readonly fileInput?: string;
    readonly fileHover?: string;
    readonly displayLabel?: string;
    readonly displayValue?: string;
}
