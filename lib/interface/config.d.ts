import { Children } from "mithril";
import { LayoutType, SignTypes, TProp } from "./widget";
export type TWidgetData = Record<string, TProp>;
export type TWidgetFunction = (data: TWidgetData, classes: string) => Children;
export interface IFunctionCall {
    readonly name: string;
    readonly data: TWidgetData;
}
export type TIcon = string | IFunctionCall;
type TCheckSlot = "label" | "icon" | "on" | "off";
export interface IConfig {
    /** Default widget layout */
    layoutType: LayoutType;
    /** Tooltip hover icon */
    tooltipIcon: string;
    /** Maximum size for upload image in px */
    imageMaxSize: number;
    /** Single file input label */
    addFileTxt: string;
    /** Multiple file input label */
    addFilesTxt: string;
    /** File remove tooltip */
    remFileTtl: string;
    /** Open file path label */
    openFileTxt: string;
    /** Password display toggle label */
    showPassTxt: string;
    /** Text to append to widget labels when field is required */
    requiredLblPost: string;
    /** Text to append to widget labels when field is not required */
    optionalLblPost: string;
    /** Date locale */
    dateLocale: string;
    datePickerIcn: TIcon;
    timePickerIcn: TIcon;
    timeScrollerUpIcn: TIcon;
    timeScrollerDownIcn: TIcon;
    /** Multi-Select list drop direction */
    selectDropUp: boolean;
    /** Default options for signature creator */
    signOpts: ReadonlyArray<SignTypes>;
    /** Maximum size for signature image in px */
    signMaxSize: number;
    /** Height of signature widget as percentage of width */
    signHeightPct: number;
    /** Signature type/stamp font */
    signFont: string;
    /** Signature "Draw" button caption */
    signDrawTxt: string;
    /** Signature "Type" button caption */
    signTypeTxt: string;
    /** Signature "Stamp" button caption */
    signStampTxt: string;
    /** Signature "Stamp" button label */
    stampTxt: string;
    /** Signature "Stamp" button class */
    stampBtnClass: string;
    /** Signature "Stamp" button context */
    stampBtnContext: string;
    /** Signature "Stamp" application canvas text */
    stampSetTxt: string;
    /** Signature "Apply" button tooltip */
    applyTtl: string;
    /** Signature "Reset" button tooltip */
    resetTtl: string;
    /** Signature "Cancel" button tooltip */
    cancelTtl: string;
    /** Signature "Draw" button icon */
    drawIcn: TIcon;
    /** Signature "Type" button icon */
    typeIcn: TIcon;
    /** Signature "Stamp" button icon */
    stampIcn: TIcon;
    applyIcn: string;
    resetIcn: string;
    cancelIcn: string;
    /** Location for widget "badge" (Currency/Percentage symbol) */
    badgePosition: "left" | "right";
    /** CurrencyInput symbol */
    currencySymbol: string;
    /** Negative currency format */
    negativeStyle: "default" | "parentheses" | "redParentheses" | "red";
    selectionLayout: ReadonlyArray<TCheckSlot>;
    selectionOnLabel: string;
    selectionOffLabel: string;
    selectionOnActive: string;
    selectionOnInactive: string;
    selectionOffActive: string;
    selectionOffInactive: string;
    checkIcn: TIcon;
    uncheckIcn: TIcon;
    toggleOnWrapper: string;
    toggleOffWrapper: string;
    toggleOnIcn: TIcon;
    toggleOffIcn: TIcon;
    radioOnIcn: TIcon;
    radioOffIcn: TIcon;
    showPassIcn: TIcon;
    hidePassIcn: TIcon;
    uploadIcn: TIcon;
    downloadIcn: TIcon;
    deleteIcn: TIcon;
    cameraIcn: string;
    imageIcn: string;
    emailIcn: string;
    telIcn: string;
    linkIcn: string;
    /** File Type Icons for file upload widget */
    wordDocIcn: string;
    videoFileIcn: string;
    pdfFileIcn: string;
    musicFileIcn: string;
    excelFileIcn: string;
    fileIcn: string;
    codeFileIcn: string;
}
/**
 * Pick keys from T where their respective value extends U
 */
export type TSubset<T, U> = Pick<T, {
    [Key in keyof T]: T[Key] extends U ? Key : never;
}[keyof T]>;
export {};
