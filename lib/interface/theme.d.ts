export type TStyle = Partial<CSSStyleDeclaration> | Record<string, string>;
export interface IClasses {
    /** Widget outermost element */
    readonly wrapper?: string;
    /** Label */
    readonly label?: string;
    /** Input element container (including "decorations" in more advanced widgets) */
    readonly inputWrapper?: string;
    /** Input element if visible */
    readonly input?: string;
    /** Override theme default invalidInputWrapper */
    readonly invalidInputWrapper?: string;
}
export interface IWidgetClasses extends IClasses {
    /** Combine classes with default classes in ui-widgets theme (true by default) */
    readonly merge?: boolean;
}
export interface IClassMap extends IClasses {
    /** Classes common to all buttons */
    readonly button?: string;
    /** Classes common to all nav buttons */
    readonly navButton?: string;
    /** Classes for textarea */
    readonly textarea?: string;
    /** Classes for file "drop zone" */
    readonly fileInputWrapper?: string;
    /** Classes for file "drop zone" when dragging a file over it */
    readonly fileHover?: string;
    /** Classes for display widget label */
    readonly displayLabel?: string;
    /** Classes for display widget value */
    readonly displayValue?: string;
    /** Classes applied to required widget label */
    readonly requiredLabel?: string;
    /** Classes applied to a requied widget input wrapper */
    readonly requiredInputWrapper?: string;
    /** Classes applied to a readonly widget input wrapper */
    readonly readonlyInputWrapper?: string;
    /** Classes applied to disabled widget wrapper */
    readonly disabledWrapper?: string;
    /** Classes applied to a disabled widget input wrapper */
    readonly disabledInputWrapper?: string;
    /** Classes applied to widget wrapper when validation fails */
    readonly invalidInputWrapper?: string;
    /** Classes applied to widget wrapper when widget is in focus */
    readonly focusInputWrapper?: string;
    /** Classes for alt label text */
    readonly altLabel?: string;
    /** Placeholder label if it is not floating yet, select "placeholder" if value not set */
    readonly floatLabelPlaceholder?: string;
    readonly invalidCheckboxWrapper?: string;
    /** classes common to all tooltips */
    readonly tooltipWrapper?: string;
    readonly tooltipIconBackground?: string;
    readonly tooltipIcon?: string;
    readonly tooltipMessage?: string;
    readonly redNumber?: string;
    /** CheckList options container */
    readonly checkListOptionsWrapper?: string;
    /** CheckList option row */
    readonly checkListOption?: string;
    /** Checklist option label (single or multiple) */
    readonly checkListOptionLabel?: string;
    /** Checklist option icon (multiple) */
    readonly checkListOptionIcon?: string;
    /** CheckList selected option (single) */
    readonly checkListOptionSingleSelected?: string;
    /** CheckList selected option (multiple) */
    readonly checkListOptionMultiSelected?: string;
    /** CheckLGroup Headers */
    readonly checkListGroupHeaders?: string;
    /** CheckLGroup Children */
    readonly checkListGroupChildren?: string;
    /** TimeInput Scroller */
    readonly timeInputScrollerWrapper?: string;
    readonly timeInputScrollerNumber?: string;
}
