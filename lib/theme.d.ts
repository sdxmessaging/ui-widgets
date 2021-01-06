import { IClassMap, IWidgetClasses } from "./interface/theme";
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
export declare function wrapperCls({ wrapper, merge }: IWidgetClasses): string;
export declare function labelCls({ label, merge }: IWidgetClasses): string;
export declare function inputWrapperCls({ inputWrapper, merge }: IWidgetClasses): string;
export declare function inputCls({ input, merge }: IWidgetClasses, disabled?: boolean, readonly?: boolean): string;
export declare function textareaCls({ input, merge }: IWidgetClasses, disabled?: boolean, readonly?: boolean): string;
export declare function radioInputCls({ input, merge }: IWidgetClasses, checked: boolean, disabled?: boolean, readonly?: boolean): string;
export declare function fileInputCls(dragging: boolean): string;
/** Set classes to indicate widget is disabled and/or cannot be interacted with */
export declare function getEnabledClass(disabled?: boolean, readonly?: boolean): "" | "o-60" | "pointer";
