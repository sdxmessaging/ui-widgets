import { IClassMap } from "./interface/theme";
export declare function imgMaxSize(): {
    "max-height": string;
};
export declare function thumbMaxSize(): {
    "max-height": string;
};
export declare const styleSm: {
    "max-width": string;
};
export declare const styleLg: {
    "max-width": string;
};
export declare const theme: Readonly<IClassMap>;
export declare function updateClasses(newConfig: Partial<IClassMap>): void;
export declare function updateButtonContext(newButtonContext: Record<string, string>): void;
export declare function getButtonContext(key?: string): string;
