import { IClassMap, IWidgetClasses } from "./interface/theme";
export declare function imgMaxSize(): {
    "max-height": string;
};
export declare function thumbMaxSize(): {
    "max-height": string;
};
export declare const enum DateWidth {
    dd = "calc(2.3ex + 4px)",
    mm = "calc(2.8ex + 4px)",
    yy = "calc(2.7ex + 4px)",
    yyyy = "calc(4.2ex + 4px)"
}
declare const classMapState: Required<IClassMap>;
export declare const theme: Readonly<typeof classMapState>;
export declare function updateClasses(newConfig: Partial<IClassMap>): void;
export declare function updateButtonContext(newButtonContext: Record<string, string>): void;
export declare function getButtonContext(key?: string): string;
export declare function wrapperCls({ wrapper, merge }: IWidgetClasses, disabled?: boolean): string;
export declare function labelCls({ label, merge }: IWidgetClasses, required?: boolean): string;
export declare function inputWrapperCls({ inputWrapper, merge }: IWidgetClasses, invalid?: boolean): string;
export declare function inputCls({ input, merge }: IWidgetClasses): string;
export declare function checkInputCls(uiClass: IWidgetClasses, disabled?: boolean, readonly?: boolean): string;
export declare function textareaCls({ input, merge }: IWidgetClasses): string;
export declare function radioInputCls({ input, merge }: IWidgetClasses, checked: boolean, disabled?: boolean, readonly?: boolean): string;
export declare function fileInputCls(dragging: boolean): string;
export declare function pointerCls(disabled?: boolean, readonly?: boolean): "" | "pointer";
export {};
