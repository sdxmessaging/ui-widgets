import { IClassMap, IWidgetClasses } from "./interface/theme";
import { IField } from "./interface/widget";
declare const classMapState: Required<IClassMap>;
export declare const theme: Readonly<typeof classMapState>;
export declare function updateClasses(newConfig: Partial<IClassMap>): void;
export declare function updateButtonContext(newButtonContext: Record<string, string>): void;
export declare function getButtonContext(key?: string): string;
export declare function joinClasses(list: ReadonlyArray<string | false | 0 | null | undefined>): string;
export declare function wrapperCls(uiClass: IWidgetClasses, disabled?: boolean): string;
export declare function labelCls(uiClass: IWidgetClasses, required?: boolean): string;
export declare function floatLabelPlaceholderCls(uiClass: IWidgetClasses, floatTop: boolean, required?: boolean): string;
export declare function inputWrapperCls(uiClass: IWidgetClasses, { required, readonly, disabled }: IField, invalid?: boolean): string;
export declare function inputCls(uiClass: IWidgetClasses): string;
export declare function checkInputCls(uiClass: IWidgetClasses, disabled?: boolean, readonly?: boolean): string;
export declare function textareaCls({ input, merge }: IWidgetClasses): string;
export declare function fileHoverCls(dragging: boolean): string;
export declare function fileInputWrapperCls({ inputWrapper, merge }: IWidgetClasses, dragging: boolean, invalid: boolean): string;
export declare function pointerCls(disabled?: boolean, readonly?: boolean): "" | "pointer";
export {};
